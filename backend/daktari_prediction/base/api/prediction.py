from tensorflow.keras.models import load_model
#from keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.utils import load_img, img_to_array
import numpy as np
import tensorflow as tf
import os

def predict(imagename):
    model = load_model('/home/athman/Documents/finalproject/daktari/backend/daktari_prediction/base/api/predmodel.h5')

    print("Model loaded")


    path = imagename

    img = load_img(path, target_size=(224,224))
    input_arr = img_to_array(img)/255


    input_arr.shape

    input_arr = np.expand_dims(input_arr, axis=0)
    pred = model.predict(input_arr)
    threshold = 0.5
    ress = np.where(pred > threshold, 1,0)
    #ress = np.argmax(pred, axis=1)
    print(ress)

    if ress == 0:
        print("No Cancer Image")
        return("No Cancer threat")
    elif ress == 1:
        print("Cancer threat ")
        return("Cancer threat")
    else:
        print("Weird")

