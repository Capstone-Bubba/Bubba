package com.twogudak.bubba.SaveDataManager

import android.content.Context
import android.content.SharedPreferences
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.util.Base64
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

    fun setFCMToken(fcm:String):Boolean {
        editor.putString("fcm",fcm)
        return editor.commit()
    }

    fun getSetting():HashMap<String, String>{
        var setting = HashMap<String, String>()
        setting["first"] = appSetting.getString("first", "true").toString()
        setting["fcm"] = appSetting.getString("fcm", "").toString()
        setting["uuid"] = appSetting.getString("uuid", "").toString()
        setting["babyname"] = appSetting.getString("babyname","").toString()
        setting["babybirth"] = appSetting.getString("babybirth","").toString()
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

    fun getBabyImg():Bitmap{
        val bitmapImage = appSetting.getString("babyImage","").toString()
        val b = Base64.decode(bitmapImage, Base64.DEFAULT)
        val c = ByteArrayInputStream(b)
        val bitmap = BitmapFactory.decodeStream(c)
        return bitmap
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