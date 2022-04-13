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
import androidx.viewpager2.widget.ViewPager2
import com.google.android.material.navigation.NavigationView
import com.google.firebase.messaging.FirebaseMessaging
import com.twogudak.bubba.R
import com.twogudak.bubba.SaveDataManager.ApplicationSetting
import com.twogudak.bubba.Ui.Alarm.AlarmActivity
import com.twogudak.bubba.Ui.CCTV.CCTV
import com.twogudak.bubba.Ui.Calendar.Calendar
import com.twogudak.bubba.Ui.Diary.Diary
import com.twogudak.bubba.Ui.Gallery.Gallery
import com.twogudak.bubba.Ui.Home.Home
import com.twogudak.bubba.Ui.Notice.Notice
import com.twogudak.bubba.Ui.Setting.Setting


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
        pagerAdapter.addFragment(Gallery())
        pagerAdapter.addFragment(Calendar())
        pagerAdapter.addFragment(Diary())
        pagerAdapter.addFragment(CCTV())
        pagerAdapter.addFragment(Setting())
        viewpager2.setUserInputEnabled(false)
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
        navigationView.setNavigationItemSelectedListener { item ->
            when(item.itemId){
                R.id.menu_Home ->  {
                    drawerlayout.closeDrawer(GravityCompat.START)
                    viewpager2.setCurrentItem(0,false)
                    return@setNavigationItemSelectedListener true }
                R.id.menu_notice ->  {
                    drawerlayout.closeDrawer(GravityCompat.START)
                    viewpager2.setCurrentItem(1,false)
                    return@setNavigationItemSelectedListener true }
                R.id.menu_Gallery ->  {
                    drawerlayout.closeDrawer(GravityCompat.START)
                    viewpager2.setCurrentItem(2,false)
                    return@setNavigationItemSelectedListener true }
                R.id.menu_Calendar ->  {
                    drawerlayout.closeDrawer(GravityCompat.START)
                    viewpager2.setCurrentItem(3,false)
                    return@setNavigationItemSelectedListener true }
                R.id.menu_Diary ->  {
                    drawerlayout.closeDrawer(GravityCompat.START)
                    viewpager2.setCurrentItem(4,false)
                    return@setNavigationItemSelectedListener true }
                R.id.menu_CCTV ->  {
                    drawerlayout.closeDrawer(GravityCompat.START)
                    viewpager2.setCurrentItem(5,false)
                    return@setNavigationItemSelectedListener true }
                R.id.menu_setting ->  {
                    drawerlayout.closeDrawer(GravityCompat.START)
                    viewpager2.setCurrentItem(6,false)
                    return@setNavigationItemSelectedListener true }
                else -> return@setNavigationItemSelectedListener false
            }
         }

        rootmenu.setOnClickListener {
            drawerlayout.openDrawer(GravityCompat.START)
        }

        val rootalarm = findViewById<ImageButton>(R.id.root_aram)
        rootalarm.setOnClickListener {
            var intent = Intent(this, AlarmActivity::class.java)
            startActivity(intent)
            overridePendingTransition(R.anim.none,R.anim.horizon_exit)
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