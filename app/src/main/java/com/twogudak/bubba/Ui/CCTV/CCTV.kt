package com.twogudak.bubba.Ui.CCTV

import android.Manifest
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.*
import android.widget.Toast
import android.widget.VideoView
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import com.twogudak.bubba.R
import com.twogudak.bubba.Ui.rootPage.rootActivty
import org.videolan.libvlc.LibVLC
import org.videolan.libvlc.Media
import org.videolan.libvlc.MediaPlayer
import org.videolan.libvlc.util.VLCVideoLayout

class CCTV : Fragment() {
    lateinit var rootActivty: rootActivty
    lateinit var videiview : VideoView

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        rootActivty = context as rootActivty

        val v = inflater.inflate(R.layout.fragment_c_c_t_v, container, false)
        // Inflate the layout for this fragment

        videiview = v.findViewById(R.id.testcctv)

        if (savedInstanceState == null) {
            if (ContextCompat.checkSelfPermission(rootActivty, Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
                //퍼미션 요청 하기
                requestReadExternalStoragePermission();
            } else {

            }
        }

        return v
    }

    override fun onStart() {
        super.onStart()

        val uri = Uri.parse("rtsp://1.228.75.116:8554/unicast")


        videiview.setVideoURI(uri)
        videiview.requestFocus()
        videiview.start()

    }

    fun requestReadExternalStoragePermission() {
        ActivityCompat.requestPermissions(rootActivty, arrayOf(android.Manifest.permission.READ_EXTERNAL_STORAGE),2)
    }

    @Override
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if( requestCode == 2 && grantResults[0] == PackageManager.PERMISSION_GRANTED){
            Toast.makeText(rootActivty, "권한 설정 OK", Toast.LENGTH_SHORT).show()
        }
        else
        {
            Toast.makeText(rootActivty, "권한 허용 안됨", Toast.LENGTH_SHORT).show()
        }
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
