package com.twogudak.bubba.Ui.rootPage

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Intent
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.ImageButton
import androidx.appcompat.widget.Toolbar
import androidx.core.view.GravityCompat
import androidx.drawerlayout.widget.DrawerLayout
import androidx.lifecycle.ViewModelProvider
import androidx.viewpager2.widget.ViewPager2
import com.google.android.material.navigation.NavigationView
import com.google.firebase.messaging.FirebaseMessaging
import com.kakao.sdk.user.UserApiClient
import com.twogudak.bubba.R
import com.twogudak.bubba.SNSLogin.Kakao_Login_class
import com.twogudak.bubba.SaveDataManager.ApplicationSetting
import com.twogudak.bubba.Ui.Alarm.AlarmActivity
import com.twogudak.bubba.Ui.CCTV.CCTV
import com.twogudak.bubba.Ui.Calendar.Calendar
import com.twogudak.bubba.Ui.Home.Home
import com.twogudak.bubba.Ui.Setting.Setting
import java.lang.Thread.sleep


class rootActivty : AppCompatActivity() {

    private lateinit var rootViewModel: rootViewModel


    private val appSetting by lazy {
        ApplicationSetting(this)
    }


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_root_activty)

        rootViewModel = ViewModelProvider(this).get(com.twogudak.bubba.Ui.rootPage.rootViewModel::class.java)

        val kakaologin = Kakao_Login_class(this)
        kakaologin.kakaoTokeninfo()

        val setting = appSetting.getSetting()
        Log.d("RootActivty_ Appsetting", setting.toString())

        val homefragment = Home()
        val calendarfragment = Calendar()
        val cctvfragment = CCTV()
        val settingfragment = Setting()

        val UserEmail = setting["email"]
        val appid = setting["appId"]


        val settingBundle = Bundle()
        settingBundle.putString("email",UserEmail)
        settingBundle.putString("appid",appid)
        Log.d("rootfragment",appid.toString())


        homefragment.arguments = settingBundle
        calendarfragment.arguments = settingBundle
        cctvfragment.arguments = settingBundle
        settingfragment.arguments = settingBundle


        val toolbar: Toolbar? = findViewById(R.id.root_toolbar)
        setSupportActionBar(toolbar)
        supportActionBar?.title = ""

        val viewpager2 = findViewById<ViewPager2>(R.id.root_viewpager2)
        val pagerAdapter = ViewPagerAdapter(this)
        pagerAdapter.addFragment(homefragment)
        pagerAdapter.addFragment(calendarfragment)
        pagerAdapter.addFragment(cctvfragment)
        pagerAdapter.addFragment(settingfragment)
        viewpager2.setUserInputEnabled(false)
        viewpager2.adapter = pagerAdapter

        viewpager2.registerOnPageChangeCallback(object : ViewPager2.OnPageChangeCallback() {
            override fun onPageSelected(position: Int) {
                super.onPageSelected(position)
                Log.d("Page Change", "Page ${position + 1}")
            }
        })

        val drawerlayout = findViewById<DrawerLayout>(R.id.drawLayout)
        val rootmenu = findViewById<ImageButton>(R.id.root_menu)
        val navigationView = findViewById<NavigationView>(R.id.nav_view)
        navigationView.setNavigationItemSelectedListener { item ->
            when (item.itemId) {
                R.id.menu_Home -> {
                    drawerlayout.closeDrawer(GravityCompat.START)
                    viewpager2.setCurrentItem(0, false)
                    return@setNavigationItemSelectedListener true
                }
                R.id.menu_Calendar -> {
                    drawerlayout.closeDrawer(GravityCompat.START)
                    viewpager2.setCurrentItem(1, false)
                    return@setNavigationItemSelectedListener true
                }
                R.id.menu_CCTV -> {
                    drawerlayout.closeDrawer(GravityCompat.START)
                    viewpager2.setCurrentItem(2, false)
                    return@setNavigationItemSelectedListener true
                }
                R.id.menu_setting -> {
                    drawerlayout.closeDrawer(GravityCompat.START)
                    viewpager2.setCurrentItem(3, false)
                    return@setNavigationItemSelectedListener true
                }
                else -> return@setNavigationItemSelectedListener false
            }
        }

        rootmenu.setOnClickListener {
            drawerlayout.openDrawer(GravityCompat.START)
        }

        val rootalarm = findViewById<ImageButton>(R.id.root_aram)

        rootalarm.setOnClickListener {
            var intent = Intent(this, AlarmActivity::class.java)
            intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
            startActivity(intent)
            overridePendingTransition(R.anim.none, R.anim.horizon_exit)
        }

        setNotificationChannel()

    }


    override fun onBackPressed() {
        //super.onBackPressed() 뒤로가기 버튼 막음
    }


    private fun setNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val name: CharSequence =
                applicationContext.resources.getString(R.string.default_notification_channel_name)
            val description = "Channel"
            val importance = NotificationManager.IMPORTANCE_DEFAULT
            val channel = NotificationChannel(
                applicationContext.resources.getString(R.string.default_notification_channel_id),
                name,
                importance
            )
            channel.description = description
            val notificationManager = getSystemService(
                NotificationManager::class.java
            )
            notificationManager.createNotificationChannel(channel)
        }
    }

}