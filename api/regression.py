import os
import sys
import numpy, scipy, matplotlib
import matplotlib.pyplot as plt
from scipy.optimize import curve_fit
from scipy.optimize import differential_evolution
import warnings

data_list = list(sys.argv[1].split(","))
list_x = list(map(lambda x: int(x), data_list[0::2]))
list_y = list(map(lambda x: int(x), data_list[1::2]))


class Predictor:

    def __init__(self, a, b, c):
        self.xData = numpy.array(list_x)
        self.yData = numpy.array(list_y)
        self.function = lambda x: ((x**a) * (numpy.log2(x)**b) * (c**x))

    def func(self, x, m, Offset):  # Sigmoid A With Offset from zunzun.com
        #return poly(a) + Offset
        return m * self.function(x) + Offset

    # function for genetic algorithm to minimize (sum of squared error)
    def sumOfSquaredError(self, parameterTuple):
        warnings.filterwarnings(
            "ignore")  # do not print warnings by genetic algorithm
        val = self.func(self.xData, *parameterTuple)
        return numpy.sum((self.yData - val)**2.0)

    def generate_Initial_Parameters(self):
        # min and max used for bounds
        maxX = max(self.xData)
        minX = min(self.xData)
        maxY = max(self.yData)
        minY = min(self.yData)

        parameterBounds = []
        parameterBounds.append([minX, maxX])  # search bounds for a
        parameterBounds.append([0.0, maxY])  # search bounds for Offset

        # "seed" the numpy random number generator for repeatable results
        result = differential_evolution(self.sumOfSquaredError,
                                        parameterBounds,
                                        seed=3)
        return result.x

    def get_parameters_and_deviation(self):
        # generate initial parameter values
        geneticParameters = self.generate_Initial_Parameters()

        # curve fit the test data
        self.fittedParameters, self.pcov = curve_fit(self.func, self.xData,
                                                     self.yData,
                                                     geneticParameters)

        #print('Parameters', self.fittedParameters)

        modelPredictions = self.func(self.xData, *self.fittedParameters)

        absError = modelPredictions - self.yData

        SE = numpy.square(absError)  # squared errors
        MSE = numpy.mean(SE)  # mean squared errors
        RMSE = numpy.sqrt(MSE)  # Root Mean Squared Error, RMSE
        Rsquared = 1.0 - (numpy.var(absError) / numpy.var(self.yData))
        #print('RMSE:', RMSE)
        #print('R-squared:', Rsquared)
        return RMSE, Rsquared

    def ModelAndScatterPlot(self, graphWidth, graphHeight):
        f = plt.figure(figsize=(graphWidth / 100.0, graphHeight / 100.0),
                       dpi=100)
        axes = f.add_subplot(111)

        # first the raw data as a scatter plot
        axes.plot(self.xData, self.yData, 'D')

        # create data for the fitted equation plot
        xModel = numpy.linspace(min(self.xData), max(self.xData))
        yModel = self.func(xModel, *self.fittedParameters)

        # now the model as a line plot
        axes.plot(xModel, yModel)

        axes.set_xlabel('X Data')  # X axis data label
        axes.set_ylabel('Y Data')  # Y axis data label

        plt.show()
        plt.close('all')  # clean up after using pyplot


import math
#pred = Predictor(1, 1, 1)
#pred.get_parameters_and_deviation()
#pred.ModelAndScatterPlot(800, 600)

result = {}
for c in range(1, 4):
    for b in range(4):
        for a in range(4):
            pred = Predictor(a, b, c)
            result[(a, b, c)] = pred.get_parameters_and_deviation()[1]
max_value_keys = [
    key for key in result.keys() if result[key] == max(result.values())
]
print(max_value_keys, end='')

##########################################################
# graphics output section
'''
def ModelAndScatterPlot(graphWidth, graphHeight):
    f = plt.figure(figsize=(graphWidth / 100.0, graphHeight / 100.0), dpi=100)
    axes = f.add_subplot(111)

    # first the raw data as a scatter plot
    axes.plot(xData, yData, 'D')

    # create data for the fitted equation plot
    xModel = numpy.linspace(min(xData), max(xData))
    yModel = func(xModel, *fittedParameters)

    # now the model as a line plot
    axes.plot(xModel, yModel)

    axes.set_xlabel('X Data')  # X axis data label
    axes.set_ylabel('Y Data')  # Y axis data label

    plt.show()
    plt.close('all')  # clean up after using pyplot
'''

#graphWidth = 800
#graphHeight = 600
#ModelAndScatterPlot(graphWidth, graphHeight)
