package com.twogudak.bubba.HttpData.RespositoryManager

import android.util.Log
import androidx.lifecycle.MutableLiveData
import com.twogudak.bubba.HttpData.loadRetrofit
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class SendToken {

    val message = MutableLiveData<String>()

    fun sendToken(token: String): MutableLiveData<String>{
        val call = loadRetrofit.OPEN_SERVICE
        val result = MutableLiveData<String>()

        var token = hashMapOf(
            "Token" to token
        )

        call.SendToken(token).enqueue(object : Callback<String>{

            override fun onResponse(call: Call<String>, response: Response<String>) {
                if(response.code() == 200){
                    result.value = response.body()
                    Log.e("Send Token","${response}")
                }else{
                    message.value = "서버와의 오류가 발생했습니다."
                }
            }

            override fun onFailure(call: Call<String>, t: Throwable) {
                Log.e("Send Token",t.toString())
                message.value = "서버와의 통신이 원활하지 않습니다."
            }
        })
        return result
    }

    fun sendFireBaseToken(token: String): MutableLiveData<String>{
        val call = loadRetrofit.OPEN_SERVICE
        val result = MutableLiveData<String>()

        var token = hashMapOf(
            "Token" to token
        )

        call.SendFireBaseToken(token).enqueue(object : Callback<String>{

            override fun onResponse(call: Call<String>, response: Response<String>) {
                if(response.code() == 200){
                    result.value = response.body()
                    Log.e("Send Token","${response}")
                }else{
                    message.value = "서버와의 오류가 발생했습니다."
                }
            }

            override fun onFailure(call: Call<String>, t: Throwable) {
                Log.e("Send Token",t.toString())
                message.value = "서버와의 통신이 원활하지 않습니다."
            }
        })
        return result
    }
}