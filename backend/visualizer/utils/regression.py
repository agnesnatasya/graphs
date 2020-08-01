import os
import sys
os.system('pip install numpy')
os.system('pip install scipy')
os.system('pip install matplotlib')

import numpy, scipy, matplotlib
import matplotlib.pyplot as plt
from scipy.optimize import curve_fit
from scipy.optimize import differential_evolution
import warnings


class Predictor:

    def __init__(self, a, b, c, x_list, y_list):
        self.x_list = numpy.array(x_list)
        self.y_list = numpy.array(y_list)
        self.function = lambda x: ((x ** a) * (numpy.log2(x) ** b) * (c ** x))
        print(self.function(1))

    def func(self, x, m, Offset):  # Sigmoid A With Offset from zunzun.com
        #return poly(a) + Offset
        return m * self.function(x) + Offset

    # function for genetic algorithm to minimize (sum of squared error)
    def sumOfSquaredError(self, parameterTuple):
        warnings.filterwarnings(
            "ignore")  # do not print warnings by genetic algorithm
        val = self.func(self.x_list, *parameterTuple)
        return numpy.sum((self.y_list - val)**2.0)

    def generate_Initial_Parameters(self):
        # min and max used for bounds
        maxX = max(self.x_list)
        minX = min(self.x_list)
        maxY = max(self.y_list)
        minY = min(self.y_list)

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
        self.fittedParameters, self.pcov = curve_fit(self.func, self.x_list,
                                                     self.y_list,
                                                     geneticParameters)

        #print('Parameters', self.fittedParameters)

        modelPredictions = self.func(self.x_list, *self.fittedParameters)

        absError = modelPredictions - self.y_list

        SE = numpy.square(absError)  # squared errors
        MSE = numpy.mean(SE)  # mean squared errors
        RMSE = numpy.sqrt(MSE)  # Root Mean Squared Error, RMSE
        Rsquared = 1.0 - (numpy.var(absError) / numpy.var(self.y_list))
        return RMSE, Rsquared


import math
#pred = Predictor(1, 1, 1)
#pred.get_parameters_and_deviation()
#pred.ModelAndScatterPlot(800, 600)
def approximate_time_complexity(x_list, y_list):
    print(x_list)
    print(y_list)
    result = {}
    if numpy.var(y_list) == 0:
      return [(0,0,1)]
    for c in range(1, 4):
        for b in range(4):
            for a in range(4):
                pred = Predictor(a, b, c, x_list, y_list)
                result[(a, b, c)] = pred.get_parameters_and_deviation()[1]
    print(result)
    max_value_keys = [
        key for key in result.keys() if result[key] == max(result.values())
    ]
    return max_value_keys