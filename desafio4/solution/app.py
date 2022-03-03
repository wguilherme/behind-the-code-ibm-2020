import numpy as np
import pandas as pd
from pandas_profiling import ProfileReport

df = pd.read_csv("algar-dataset-treino.csv")
prof = ProfileReport(df)
prof.to_file(output_file='output.html')
