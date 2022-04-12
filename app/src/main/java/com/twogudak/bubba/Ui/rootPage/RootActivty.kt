package com.twogudak.bubba.Ui.rootPage

import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.ImageButton
import androidx.appcompat.widget.Toolbar
import androidx.core.view.GravityCompat
import androidx.drawerlayout.widget.DrawerLayout
import androidx.viewpager2.widget.ViewPager2
import com.google.android.material.navigation.NavigationView
import com.google.firebase.messaging.FirebaseMessaging
import com.twogudak.bubba.R
import com.twogudak.bubba.SaveDataManager.ApplicationSetting
import com.twogudak.bubba.Ui.Home.Home
import com.twogudak.bubba.Ui.Notice.Notice
import com.twogudak.bubba.Ui.ViewPagerAdapter

class rootActivty : AppCompatActivity() {

    private val appSetting by lazy {
        ApplicationSetting(this)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_root_activty)

        val toolbar: Toolbar? = findViewById(R.id.root_toolbar)
        setSupportActionBar(toolbar)

        val viewpager2 = findViewById<ViewPager2>(R.id.root_viewpager2)
        val pagerAdapter = com.twogudak.bubba.Ui.rootPage.ViewPagerAdapter(this)
        pagerAdapter.addFragment(Home())
        pagerAdapter.addFragment(Notice())
        viewpager2.adapter = pagerAdapter

        viewpager2.registerOnPageChangeCallback(object : ViewPager2.OnPageChangeCallback(){
            override fun onPageSelected(position: Int) {
                super.onPageSelected(position)
                Log.d("Page Change","Page ${position + 1}")
            }
        })

        val drawerlayout = findViewById<DrawerLayout>(R.id.drawLayout)
        val rootmenu = findViewById<ImageButton>(R.id.root_menu)
        val navigationView = findViewById<NavigationView>(R.id.nav_view)

        rootmenu.setOnClickListener {
            drawerlayout.openDrawer(GravityCompat.START)
        }

        initFirebase()
        setNotificationChannel()


    }

    override fun onBackPressed() {
        //super.onBackPressed() 뒤로가기 버튼 막음
    }

    private fun initFirebase() {
        FirebaseMessaging.getInstance().token
            .addOnCompleteListener { task ->
                if(!task.isSuccessful) {
                    Log.d("Firebase","getInstanceId failed", task.exception)
                    return@addOnCompleteListener
                }

                //Get new Instance ID token
                val token = task.result!!
                FirebaseMessaging.getInstance()
                    .subscribeToTopic("test")
                Log.d("Firebase", token)
                appSetting.setFCMToken(token)
            }
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