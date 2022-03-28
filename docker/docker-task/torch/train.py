import os
import numpy as np
import torch
print ("Hello pytorch")
print (torch.__version__)

PYTORCH_USER = os.environ['PYTORCH_USER']
if not PYTORCH_USER == "pytorch":
  raise ValueError("The correct value has not been entered for PYTORCH_USER.\nPYTORCH_USER: {}".format(PYTORCH_USER))
print ("SUCCESS!!!")

