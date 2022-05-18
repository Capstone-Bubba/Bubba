package com.twogudak.bubba.Ui.Notice

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.twogudak.bubba.R
import com.twogudak.bubba.Ui.rootPage.rootActivty

class Notice : Fragment() {

    val data = ArrayList<String>()
    lateinit var rootActivty: rootActivty
    lateinit var recyclerView: RecyclerView

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        rootActivty = context as rootActivty
        val v = inflater.inflate(R.layout.fragment_notice, container, false)
        recyclerView = v.findViewById<RecyclerView>(R.id.notice_recyclerView)
        return v
    }

    override fun onStart() {
        super.onStart()

        val recyclerView_Adapter = Notice_recycler_View(rootActivty,data)
        recyclerView.adapter = recyclerView_Adapter
        recyclerView.layoutManager = LinearLayoutManager(rootActivty)


    }

}