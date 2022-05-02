package com.twogudak.bubba.Ui.Notice

import android.content.Context
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.twogudak.bubba.R

class Notice_recycler_View(var context: Context,var data : ArrayList<String>): RecyclerView.Adapter<Notice_recycler_View.ViewHolderClass>() {

    override fun getItemCount(): Int {
        return 10
    }



    override fun onCreateViewHolder( parent: ViewGroup, viewType: Int): ViewHolderClass {
        val itemView = LayoutInflater.from(context).inflate(R.layout.notice_row,parent,false)
        val holder =  ViewHolderClass(itemView)
        itemView.setOnClickListener(holder)

        return holder
    }

    override fun onBindViewHolder(holder: ViewHolderClass, position: Int) {

    }

    inner class ViewHolderClass(itemView: View): RecyclerView.ViewHolder(itemView), View.OnClickListener{

        override fun onClick(p0: View?) {
            Log.d("Notice","${adapterPosition}")
        }
    }
}