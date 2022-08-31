package com.twogudak.bubba.HttpData.DTO

import com.google.gson.annotations.SerializedName
import java.time.LocalDate
import java.time.LocalDateTime

data class CalendarDTO(
    @SerializedName("result")
    var CalendarList: ArrayList<CalendarDetail>)

data class CalendarDetail(
    @SerializedName("calendar_num")
    var calendar_num: Int,
    @SerializedName("calendar_date")
    var calendar_date: String,
    @SerializedName("calendar_title")
    var calendar_title: String,
    @SerializedName("calendar_content")
    var calendar_content: String,
)
