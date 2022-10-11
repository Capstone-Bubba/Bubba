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
                    result.postValue(response.body())
                    Log.e("Send Token","${response}")
                }else{
                    message.postValue("서버와의 오류가 발생했습니다.")
                }
            }

            override fun onFailure(call: Call<String>, t: Throwable) {
                Log.e("Send Token Error",t.toString())
                message.postValue("서버와의 오류가 발생했습니다.")
            }
        })
        return result
    }

    fun sendFireBaseToken(token: String, appId: String): MutableLiveData<String>{
        val call = loadRetrofit.OPEN_SERVICE
        val result = MutableLiveData<String>()

        var token = hashMapOf(
            "deviceToken" to token,
            "email" to appId
        )

        call.SendFireBaseToken(token).enqueue(object : Callback<String>{

            override fun onResponse(call: Call<String>, response: Response<String>) {
                if(response.code() == 200){
                    result.postValue(response.body())
                    Log.d("Send firebase Token","${response}")
                }else{
                    message.postValue("서버와의 오류가 발생했습니다.")
                }
            }

            override fun onFailure(call: Call<String>, t: Throwable) {
                Log.e("Send fire base Token",t.toString())
                message.postValue("서버와의 오류가 발생했습니다.")
            }
        })
        return result
    }

    fun sendUserData(plateform: String, Email: String): MutableLiveData<String>{
        val call = loadRetrofit.OPEN_SERVICE
        val result = MutableLiveData<String>()


        var token = hashMapOf(
            "platform" to plateform,
            "email" to Email
        )

        Log.d("Send User Data","UserData :${token}")

        call.RegisterUserData(token).enqueue(object : Callback<String>{

            override fun onResponse(call: Call<String>, response: Response<String>) {
                if(response.code() == 200){
                    result.postValue(response.body())
                    Log.d("Send User Data","${response}")
                }else{
                    message.postValue("서버와의 오류가 발생했습니다.")
                }
            }

            override fun onFailure(call: Call<String>, t: Throwable) {
                Log.e("Send User Token",t.toString())
                message.postValue("서버와의 오류가 발생했습니다.")
            }
        })
        return result
    }
}