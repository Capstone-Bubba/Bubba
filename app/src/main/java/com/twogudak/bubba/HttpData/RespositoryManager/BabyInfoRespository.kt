package com.twogudak.bubba.HttpData.RespositoryManager

import android.util.Log
import androidx.lifecycle.MutableLiveData
import com.twogudak.bubba.HttpData.DTO.BabyInfoDTO
import com.twogudak.bubba.HttpData.loadRetrofit
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class BabyInfoRespository {

    val message = MutableLiveData<String>()

    fun BabyInfoCall(user_num: Int): MutableLiveData<BabyInfoDTO> {
        val call = loadRetrofit.OPEN_SERVICE
        val result = MutableLiveData<BabyInfoDTO>()

        call.BabyInfoCall(user_num.toString()).enqueue(object : Callback<BabyInfoDTO> {
            override fun onResponse(call: Call<BabyInfoDTO>, response: Response<BabyInfoDTO>) {
                if(response.code() == 200){
                    result.value = response.body()
                    Log.d("Call BabyInfo","${response}")
                }else{
                    message.postValue("서버와의 오류가 발생했습니다.")
                }
            }
            override fun onFailure(call: Call<BabyInfoDTO>, t: Throwable) {
                Log.e("Call Baby InFo",t.toString())
                message.postValue("서버와의 오류가 발생했습니다.")
            }
        })
        return result
    }
}