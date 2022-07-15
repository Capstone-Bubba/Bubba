package com.twogudak.bubba.Ui.rootPage

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.twogudak.bubba.HttpData.RespositoryManager.SendToken

class rootViewModel(application: Application) : AndroidViewModel(application) {

    var rootViewModelRepository = SendToken()

    fun sendToken(Token: String): MutableLiveData<String>{
        return rootViewModelRepository.sendToken(Token)
    }

    fun getmessage(): LiveData<String> {
        return rootViewModelRepository.message
    }

    fun sendFireBaseToken(Token: String, appId: String): MutableLiveData<String>{
        return rootViewModelRepository.sendFireBaseToken(Token,appId)
    }
}