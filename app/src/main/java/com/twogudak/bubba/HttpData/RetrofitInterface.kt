package com.twogudak.bubba.HttpData

import com.twogudak.bubba.HttpData.DTO.CalendarDTO
import retrofit2.Call
import retrofit2.http.*


interface RetrofitInterface {
    @POST("/auth/app/kakao/callback")
    fun SendToken(@Body Token : HashMap<String,String>): Call<String>

    @POST("/push/testing")
    fun SendFireBaseToken(@Body Token : HashMap<String,String>) : Call<String>

    @POST("/calendar/update")
    fun CalendarUpdate(@Query("baby_num") baby_num : HashMap<String,Int>, @Body calendarimfo : HashMap<String,String>) : Call<String>

    @GET("/calendar/")
    fun CalendarCall(@Query("baby_num") baby_num : String,) : Call<CalendarDTO>
}