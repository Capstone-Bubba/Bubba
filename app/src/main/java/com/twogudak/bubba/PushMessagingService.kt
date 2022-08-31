package com.twogudak.bubba


import android.app.AlertDialog
import android.content.Context
import android.content.DialogInterface
import android.content.Intent
import android.os.Vibrator
import android.util.Log
import androidx.localbroadcastmanager.content.LocalBroadcastManager
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class PushMessagingService : FirebaseMessagingService() {

    val vibrator = getSystemService(Context.VIBRATOR_SERVICE) as Vibrator
    val pattern = longArrayOf(100, 200, 100, 200, 100, 200)

    override fun onNewToken(token: String) {
        super.onNewToken(token)
        Log.d("Refresh Token push notification",token)
    }

    override fun onMessageReceived(message: RemoteMessage) {
        super.onMessageReceived(message)
        Log.d("FCM","From:${message.from}")

        val intent = Intent("notification Message")
        LocalBroadcastManager.getInstance(this).sendBroadcast(intent)

        if(message.data.isNotEmpty()){
            Log.d("FCM","data: ${message.data}")
        }

        message.notification?.let {
            Log.d("FCM", "Message Notification Body: ${it.body}")
        }

        vibrator.vibrate(pattern, 0)
        showAlert()

    }

    override fun onDeletedMessages() {
        super.onDeletedMessages()

        Log.d("Refresh Token push notification","DeletedMessages")
    }

    fun showAlert()
    {
        var dialogBuilder = AlertDialog.Builder(this)
        var dialog = dialogBuilder.setTitle("경고 알림.")
            .setMessage("아이의 상태 정보")
            .setNegativeButton("알림 중지", DialogInterface.OnClickListener { dialogInterface, i ->
                vibrator.cancel()
            })
            .setCancelable(false)
            .create()
        dialog.show()

    }



}

