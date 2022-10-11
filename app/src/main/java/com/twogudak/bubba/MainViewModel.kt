package com.twogudak.bubba

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.twogudak.bubba.HttpData.RespositoryManager.SendToken

class MainViewModel(application: Application) : AndroidViewModel(application) {

    var splashViewModelRepository = SendToken()

    fun sendToken(Token: String): MutableLiveData<String> {
        return splashViewModelRepository.sendToken(Token)
    }

    fun getmessage(): LiveData<String> {
        return splashViewModelRepository.message
    }

    fun sendFireBaseToken(Token: String, appId: String): MutableLiveData<String> {
        return splashViewModelRepository.sendFireBaseToken(Token,appId)
    }

    fun sendUserData(plateform: String, Email: String) : MutableLiveData<String> {
        return splashViewModelRepository.sendUserData(plateform,Email)
    }
}