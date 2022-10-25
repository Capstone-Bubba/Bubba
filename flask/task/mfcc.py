from datetime import datetime
import librosa
import timm
import torch
import torch.nn as nn
import torch.nn.functional as F
import pandas as pd
import numpy as np
import sklearn.preprocessing
import torchvision.transforms as transforms
import database

pad2d = lambda a, i: a[:, 0:i] if a.shape[1] > i else np.hstack((a, np.zeros((a.shape[0], i-a.shape[1]))))
db_class = database.Database()


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

def baby_cry_classifi(cry_path,device, user_num, cry_classifi_model):
    tmp_list = []
    cry_data = []
    data, sr = librosa.load(cry_path, sr=16000)
    tmp_list.append(trans_mfcc(data, sr))
    tmp_list.append(trans_mel(data, sr))
    tmp_list.append(trans_spec(data, sr))
    cry_data.append(tmp_list)
    with torch.no_grad():
      cry_classifi_model.eval()
      b=np.array(cry_data)
      inputs = torch.FloatTensor(b).permute(0, 1, 3,2).to(device)
      outputs = cry_classifi_model(inputs)
      result = outputs.argmax().item()
    if(result == 0):
      sql1 = "INSERT INTO bubba.mfccinfo(user_num, mfcc_result, accur_time) \
                    VALUES(%s, %s, %s)"
      db_class.execute(sql1, [user_num, '불편함', datetime.now()])
      db_class.commit()
      return "불편함"
    elif(result == 1):
      sql1 = "INSERT INTO bubba.mfccinfo(user_num, mfcc_result, accur_time) \
                    VALUES(%s, %s, %s)"
      db_class.execute(sql1, [user_num, '배아픔', datetime.now()])
      db_class.commit()
      return "배아픔"
    elif(result == 2):
      sql1 = "INSERT INTO bubba.mfccinfo(user_num, mfcc_result, accur_time) \
                    VALUES(%s, %s, %s)"
      db_class.execute(sql1, [user_num, '배고픔', datetime.now()])
      db_class.commit()
      return "배고픔"
    elif(result == 3):
      sql1 = "INSERT INTO bubba.mfccinfo(user_num, mfcc_result, accur_time) \
                    VALUES(%s, %s, %s)"
      db_class.execute(sql1, [user_num, '트림', datetime.now()])
      db_class.commit()
      return "트림"
    elif(result == 4):
      sql1 = "INSERT INTO bubba.mfccinfo(user_num, mfcc_result, accur_time) \
                    VALUES(%s, %s, %s)"
      db_class.execute(sql1, [user_num, '피곤함', datetime.now()])
      db_class.commit()
      return "피곤함"


# def baby_cry_detect(cry_path,cry_detect_model,device):
#     tmp_list = []
#     cry_data = []
#     data, sr = librosa.load(cry_path, sr=16000)
#     tmp_list.append(trans_mfcc(data, sr))
#     tmp_list.append(trans_mel(data, sr))
#     tmp_list.append(trans_spec(data, sr))
#     cry_data.append(tmp_list)
#     with torch.no_grad():
#        cry_detect_model.eval()
#        b= np.array(cry_data)
#        inputs = torch.FloatTensor(b).permute(0, 1, 3,2).to(device)
#        outputs = cry_detect_model(inputs)
#        print(outputs.argmax().item())
#        if (outputs.argmax().item() == 12): #값이 12면 울음소리이므로 baby_cry_classifi 실행
#           return cry_data
#        else:
#           return False
