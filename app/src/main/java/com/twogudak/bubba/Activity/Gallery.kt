package com.twogudak.bubba.Activity

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageButton
import androidx.appcompat.widget.Toolbar
import androidx.core.view.GravityCompat
import androidx.drawerlayout.widget.DrawerLayout
import com.google.android.material.navigation.NavigationView
import com.twogudak.bubba.R

class Gallery : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_gallery)

        val toolbar: Toolbar? = findViewById(R.id.root_toolbar)
        setSupportActionBar(toolbar)

        val drawerlayout = findViewById<DrawerLayout>(R.id.gallery_drawerlayout)
        val rootmenu = findViewById<ImageButton>(R.id.root_menu)
        val navigationView = findViewById<NavigationView>(R.id.gallery_nav_view)
        com.twogudak.bubba.Menu.NavigationView(this).makenavigationView(navigationView,drawerlayout)

        rootmenu.setOnClickListener {
            drawerlayout.openDrawer(GravityCompat.START)
        }
    }

    override fun onBackPressed() {
        //super.onBackPressed() 뒤로가기 버튼 막음
    }
    override fun onPause() {
        super.onPause()

        overridePendingTransition(0, 0)
    }
}