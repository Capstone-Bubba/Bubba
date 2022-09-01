package com.twogudak.bubba.Ui.Calendar

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.twogudak.bubba.HttpData.DTO.CalendarDTO
import com.twogudak.bubba.HttpData.RespositoryManager.CalendarRespositroy

class CalendarViewModel(application: Application) : AndroidViewModel(application) {

    var calendarViewRespositroy = CalendarRespositroy()

    fun callCalendar(baby_num: Int,email: String): MutableLiveData<CalendarDTO> {
        return calendarViewRespositroy.callCalendar(baby_num,email)
    }

    fun getmessage(): LiveData<String> {
        return calendarViewRespositroy.message
    }
}