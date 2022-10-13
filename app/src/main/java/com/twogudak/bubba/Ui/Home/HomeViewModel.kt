package com.twogudak.bubba.Ui.Home

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.twogudak.bubba.HttpData.DTO.AlarmInfoDTO
import com.twogudak.bubba.HttpData.DTO.BabyInfoDTO
import com.twogudak.bubba.HttpData.RespositoryManager.AlarmInfoRespository


class HomeViewModel(application: Application) : AndroidViewModel(application) {

    var BabyInfoRespository = com.twogudak.bubba.HttpData.RespositoryManager.BabyInfoRespository()
    var AlarmInfoRepository = AlarmInfoRespository()

    fun BabyInfoCall(appid: Int): MutableLiveData<BabyInfoDTO> {
        return BabyInfoRespository.BabyInfoCall(appid)
    }

    fun getmessage(): LiveData<String> {
        return BabyInfoRespository.message
    }

    fun AlarminfoCall(appid: Int): MutableLiveData<AlarmInfoDTO> {
        return AlarmInfoRepository.AlarmInfoCall(appid)
    }

    fun getmessageAlarmInfo(): LiveData<String> {
        return AlarmInfoRepository.message
    }

}