package com.twogudak.bubba.HttpData.RespositoryManager

import android.util.Log
import androidx.lifecycle.MutableLiveData
import com.twogudak.bubba.HttpData.DTO.CalendarDTO
import com.twogudak.bubba.HttpData.loadRetrofit
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class CalendarRespositroy {

    val message = MutableLiveData<String>()

    fun callCalendar(baby_num: Int): MutableLiveData<CalendarDTO> {
        val call = loadRetrofit.OPEN_SERVICE
        val result = MutableLiveData<CalendarDTO>()



        call.CalendarCall(baby_num.toString()).enqueue(object : Callback<CalendarDTO> {
            override fun onResponse(call: Call<CalendarDTO>, response: Response<CalendarDTO>) {
                if(response.code() == 200){
                    result.value = response.body()
                    Log.e("Call Calendar","${response}")
                }else{
                    message.postValue("서버와의 오류가 발생했습니다.")
                }
            }

            override fun onFailure(call: Call<CalendarDTO>, t: Throwable) {
                Log.e("Call Calendar",t.toString())
                message.postValue("서버와의 오류가 발생했습니다.")
            }
        })
        return result
    }
}