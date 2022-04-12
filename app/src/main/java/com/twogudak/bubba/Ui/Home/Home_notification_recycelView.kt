package com.twogudak.bubba.Ui.Home

import android.content.Context
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.twogudak.bubba.R

class Home_notification_recycelView(var context: Context, var timedata: ArrayList<String>, var titledata: ArrayList<String>):RecyclerView.Adapter<Home_notification_recycelView.ViewHolderClass>() {

    override fun getItemCount(): Int {
        return timedata.size
    }

    override fun onCreateViewHolder( parent: ViewGroup, viewType: Int): Home_notification_recycelView.ViewHolderClass {
        val itemView = LayoutInflater.from(context).inflate(R.layout.home_notification,parent,false)
        val holder = ViewHolderClass(itemView)
        itemView.setOnClickListener(holder)

        return holder
    }

    override fun onBindViewHolder(holder: Home_notification_recycelView.ViewHolderClass,  position: Int) {
        holder.row_noti_times.text = timedata[position]
        holder.row_noti_title.text = titledata[position]
    }


    inner class ViewHolderClass(itemView: View) : RecyclerView.ViewHolder(itemView), View.OnClickListener {

        val row_noti_times = itemView.findViewById<TextView>(R.id.home_notification_row_time)
        val row_noti_title = itemView.findViewById<TextView>(R.id.home_notification_row_title)

        override fun onClick(p0: View?) {
            Log.d("pressed home recycler View","${adapterPosition}")
        }
    }




}