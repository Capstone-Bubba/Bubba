package com.twogudak.bubba.HttpData.RespositoryManager

import android.util.Log
import androidx.lifecycle.MutableLiveData
import com.twogudak.bubba.HttpData.DTO.AlarmInfoDTO

import com.twogudak.bubba.HttpData.loadRetrofit
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class AlarmInfoRespository{

    val message = MutableLiveData<String>()

    fun AlarmInfoCall(user_num: Int): MutableLiveData<AlarmInfoDTO> {
        val call = loadRetrofit.OPEN_SERVICE
        val result = MutableLiveData<AlarmInfoDTO>()

        call.AlarmInfoCall(user_num.toString()).enqueue(object : Callback<AlarmInfoDTO> {
            override fun onResponse(call: Call<AlarmInfoDTO>, response: Response<AlarmInfoDTO>) {
                if(response.code() == 200){
                    result.value = response.body()
                    Log.d("Call AlarmInfoCall","${response}")
                }else{
                    message.postValue("서버와의 오류가 발생했습니다.")
                }
            }
            override fun onFailure(call: Call<AlarmInfoDTO>, t: Throwable) {
                Log.e("Call AlarmInfoCall",t.toString())
                message.postValue("서버와의 오류가 발생했습니다.")
            }
        })
        return result
    }
}