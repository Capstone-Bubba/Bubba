package com.twogudak.bubba.Menu

import android.content.Context
import android.content.Intent
import androidx.core.view.GravityCompat
import androidx.drawerlayout.widget.DrawerLayout
import com.google.android.material.navigation.NavigationView
import com.twogudak.bubba.Activity.*
import com.twogudak.bubba.R
import com.twogudak.bubba.rootActivty

class NavigationView(context: Context) {

    private var context = context


    fun makenavigationView(navigationView: NavigationView, drawerLayout: DrawerLayout) {
        navigationView.setNavigationItemSelectedListener { item ->
            when (item.itemId) {
                R.id.menu_Home -> {
                    var Intent = Intent(context, rootActivty::class.java)

                    drawerLayout.closeDrawer(GravityCompat.START)
                    Intent.addFlags(android.content.Intent.FLAG_ACTIVITY_CLEAR_TOP)
                    Intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK)
                    Intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NO_ANIMATION)
                    context.startActivity(Intent)
                    true
                }
                R.id.menu_CCTV -> {
                    var CCTVIntent = Intent(context, CCTV::class.java)
                    drawerLayout.closeDrawer(GravityCompat.START)
                    CCTVIntent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
                    CCTVIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                    CCTVIntent.addFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION)
                    context.startActivity(CCTVIntent)
                    true
                }
                R.id.menu_notice -> {
                    var Intent = Intent(context, Notice::class.java)
                    drawerLayout.closeDrawer(GravityCompat.START)
                    Intent.addFlags(android.content.Intent.FLAG_ACTIVITY_CLEAR_TOP)
                    Intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK)
                    Intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NO_ANIMATION)
                    context.startActivity(Intent)
                    true
                }
                R.id.menu_Gallery -> {
                    var Intent = Intent(context, Gallery::class.java)
                    drawerLayout.closeDrawer(GravityCompat.START)
                    Intent.addFlags(android.content.Intent.FLAG_ACTIVITY_CLEAR_TOP)
                    Intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK)
                    Intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NO_ANIMATION)
                    context.startActivity(Intent)
                    true
                }
                R.id.menu_Calendar -> {
                    var Intent = Intent(context, Calendar::class.java)
                    drawerLayout.closeDrawer(GravityCompat.START)
                    Intent.addFlags(android.content.Intent.FLAG_ACTIVITY_CLEAR_TOP)
                    Intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK)
                    Intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NO_ANIMATION)
                    context.startActivity(Intent)
                    true
                }
                R.id.menu_Diary -> {
                    var Intent = Intent(context, Diary::class.java)
                    drawerLayout.closeDrawer(GravityCompat.START)
                    Intent.addFlags(android.content.Intent.FLAG_ACTIVITY_CLEAR_TOP)
                    Intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK)
                    Intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NO_ANIMATION)
                    context.startActivity(Intent)
                    true
                }
                R.id.menu_setting -> {
                    var Intent = Intent(context, Setting::class.java)
                    drawerLayout.closeDrawer(GravityCompat.START)
                    Intent.addFlags(android.content.Intent.FLAG_ACTIVITY_CLEAR_TOP)
                    Intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK)
                    Intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NO_ANIMATION)
                    context.startActivity(Intent)
                    true
                }
                else -> false
            }
        }
    }

}