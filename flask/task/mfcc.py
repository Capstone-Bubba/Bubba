
import librosa
import timm
import torch
import torch.nn as nn
import torch.nn.functional as F
import pandas as pd
import numpy as np
import sklearn.preprocessing
import torchvision.transforms as transforms

pad2d = lambda a, i: a[:, 0:i] if a.shape[1] > i else np.hstack((a, np.zeros((a.shape[0], i-a.shape[1]))))

def trans_mfcc(data,sr):
  mfcc = librosa.feature.mfcc(data, sr=sr, n_mfcc = 128, n_fft=400, hop_length=160)
  mfcc = sklearn.preprocessing.scale(mfcc, axis=1)
  local_max, local_min = mfcc.max(), mfcc.min()
  mfcc = (mfcc - local_min)/(local_max - local_min)
  padded_mfcc = pad2d(mfcc, 700)
  return padded_mfcc


def trans_mel(data,sr):
  S = librosa.feature.melspectrogram(data, sr=sr, hop_length=160)
  S_DB = librosa.amplitude_to_db(S, ref=np.max)
  local_max, local_min = S_DB.max(), S_DB.min()
  S_DB = (S_DB - local_min)/(local_max - local_min)
  padded_S_DB = pad2d(S_DB, 700)
  return padded_S_DB


def trans_spec(data,sr):
  D = np.abs(librosa.stft(data, n_fft=254, hop_length=160)) #n_fft : window size / 이 때, 음성의 길이를 얼마만큼으로 자를 것인가? 를 window라고 부른다.
  DB = librosa.amplitude_to_db(D, ref=np.max) #amplitude(진폭) -> DB(데시벨)로 바꿔라
  local_max, local_min = DB.max(), DB.min()
  DB = (DB - local_min)/(local_max - local_min)
  padded_DB = pad2d(DB, 700)
  return padded_DB




def baby_cry_detect(cry_path,cry_detect_model,device):
    tmp_list = []
    cry_data = []
    data, sr = librosa.load(cry_path, sr=16000)
    tmp_list.append(trans_mfcc(data, sr))
    tmp_list.append(trans_mel(data, sr))
    tmp_list.append(trans_spec(data, sr))
    cry_data.append(tmp_list)
    with torch.no_grad():
       cry_detect_model.eval()
       b= np.array(cry_data)
       inputs = torch.FloatTensor(b).permute(0, 1, 3,2).to(device)
       outputs = cry_detect_model(inputs)
    return outputs.argmax().item()

# 0 불편함
# 1 배아픔
# 2 배고픔
# 3 트림
# 4 피곤함
# test = baby_cry_detect("./static/69BDA5D6-0276-4462-9BF7-951799563728-1436936185-1.1-m-26-bp.wav")
# if(test == 0):
#     print("불편함")
# elif(test == 1):
#     print("배아픔")
# elif(test == 2):
#     print("배고픔")
# elif(test == 3):
#     print("트림")
# elif(test == 4):
#     print("피곤함")