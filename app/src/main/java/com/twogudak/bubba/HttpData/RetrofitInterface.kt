package com.twogudak.bubba.HttpData

import com.twogudak.bubba.HttpData.DTO.AlarmInfoDTO
import com.twogudak.bubba.HttpData.DTO.BabyInfoDTO
import com.twogudak.bubba.HttpData.DTO.CalendarDTO
import retrofit2.Call
import retrofit2.http.*


interface RetrofitInterface {

    @POST("/auth/app/kakao/callback")
    fun SendToken(@Body Token : HashMap<String,String>): Call<String>

    @POST("/auth/app/token")
    fun SendFireBaseToken(@Body Token : HashMap<String,String>) : Call<String>

    @POST("/calendar/update")
    fun CalendarUpdate(@Query("baby_num") baby_num : HashMap<String,Int>, @Body calendarimfo : HashMap<String,String>) : Call<String>

    @GET("/calendar")
    fun CalendarCall(@Query("baby_num") baby_num : String) : Call<CalendarDTO>

    @POST("/auth/app/login")
    fun RegisterUserData(@Body userData : HashMap<String,String>) : Call<String>

    @GET("/baby/app")
    fun BabyInfoCall(@Query("user_num") user_num : String) : Call<BabyInfoDTO>

    @GET("/auth/app/mfcc")
    fun AlarmInfoCall(@Query("user_num") user_num : String) : Call<AlarmInfoDTO>
}