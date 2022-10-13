package com.twogudak.bubba.SaveDataManager

import android.content.Context
import android.content.SharedPreferences
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.util.Base64
import android.util.Log
import com.google.android.gms.common.util.Base64Utils
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.util.*
import kotlin.collections.HashMap

class ApplicationSetting(context: Context) {

    var appSetting: SharedPreferences = context.getSharedPreferences("setting", Context.MODE_PRIVATE)
    var editor = appSetting.edit()

    fun setFirstCheck(first: Boolean):Boolean{
        editor.putString("first",first.toString())
        return editor.commit()
    }

    fun setAppid(Appid: String):Boolean{
        editor.putString("Appid",Appid)
        Log.d("ApplicationSetting","앱 Appid 셋팅 완료")
        return editor.commit()
    }

    fun setbabyid(babyid: String):Boolean{
        editor.putString("babyid",babyid)
        Log.d("ApplicationSetting","앱 babyid 셋팅 완료")
        return editor.commit()
    }

    fun setFCMToken(fcm:String):Boolean {
        editor.putString("fcm",fcm)
        return editor.commit()
    }

    fun setEmail(email: String):Boolean {
        Log.d("Email AppSetting",email)
        editor.putString("email",email)
        return editor.commit()
    }

    fun getSetting():HashMap<String, String>{
        var setting = HashMap<String, String>()
        setting["first"] = appSetting.getString("first", "true").toString()
        setting["fcm"] = appSetting.getString("fcm", "").toString()
        setting["uuid"] = appSetting.getString("uuid", "").toString()
        setting["babyname"] = appSetting.getString("babyname","").toString()
        setting["babybirth"] = appSetting.getString("babybirth","").toString()
        setting["email"] = appSetting.getString("email","Non").toString()
        setting["appId"] = appSetting.getString("Appid","").toString()
        setting["babyid"] = appSetting.getString("babyid","").toString()
        return setting
    }

    fun setBabyInfo(babyname:String, babybirth:String):Boolean {
        editor.putString("babyname",babyname)
        editor.putString("babybirth", babybirth)
        return editor.commit()
    }

    fun setBabyImg(babyImage: Bitmap):Boolean{
        editor.putString("babyImage",endcodeTobase64(babyImage))
        return editor.commit()
    }

    fun getBabyImg(): Bitmap?{
        val bitmapImage = appSetting.getString("babyImage","non").toString()
        if (bitmapImage != "non"){
            val b = Base64.decode(bitmapImage, Base64.DEFAULT)
            val c = ByteArrayInputStream(b)
            val bitmap = BitmapFactory.decodeStream(c)
            Log.d("appsetting","return bitmap")

            return bitmap
        } else {
            Log.d("appsetting","return null")
            return null
        }
    }

    fun endcodeTobase64(image: Bitmap): String {
        val bitmapImage = image
        val baos = ByteArrayOutputStream()
        bitmapImage.compress(Bitmap.CompressFormat.PNG, 100, baos)
        val b = baos.toByteArray()
        val imageEncode = Base64.encodeToString(b, Base64.DEFAULT)

        return imageEncode
    }

}