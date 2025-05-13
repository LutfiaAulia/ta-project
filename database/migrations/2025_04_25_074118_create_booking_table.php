<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('booking', function (Blueprint $table) {
            $table->id('id_booking');
            $table->dateTime('jadwal');
            $table->text('acara');
            $table->integer('peserta');
            $table->string('layanan');
            $table->string('lokasi');
            $table->string('no_hp');
            $table->string('surat');
            $table->string('pegawailap')->nullable();
            $table->text('alasan_ditolak')->nullable();
            $table->string('status_booking');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking');
    }
};
