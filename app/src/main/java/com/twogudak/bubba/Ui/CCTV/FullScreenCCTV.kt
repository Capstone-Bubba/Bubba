package com.twogudak.bubba.Ui.CCTV

import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageButton
import android.widget.VideoView
import com.twogudak.bubba.R

class FullScreenCCTV : AppCompatActivity() {

    lateinit var fullScreenBackBT : ImageButton
    lateinit var videiview : VideoView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_full_screen_cctv)

        fullScreenBackBT = findViewById(R.id.fullScreen_backbt)
        videiview = findViewById(R.id.fullScreenVideoView)

        fullScreenBackBT.setOnClickListener {
            finish()
        }
    }

    override fun onStart() {
        super.onStart()
        val uri = Uri.parse("rtsp://1.228.75.116:8554/unicast")


        videiview.setVideoURI(uri)
        videiview.requestFocus()
        videiview.start()
    }

    override fun onResume() {
        super.onResume()
        videiview.start()
    }

    override fun onDestroy() {
        super.onDestroy()
        videiview.pause()
        videiview.stopPlayback()
    }

    override fun onStop() {
        super.onStop()
        videiview.pause()
        videiview.stopPlayback()
    }
}