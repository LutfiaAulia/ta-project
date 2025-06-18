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
        Schema::create('laporan', function (Blueprint $table) {
            $table->id('id_laporan');
            $table->text('judul');
            $table->text('dasar');
            $table->text('maksud');
            $table->text('tujuan');
            $table->text('biaya');
            $table->longText('ringkasan_pelaksana');
            $table->longText('kesimpulan');
            $table->longText('saran');
            $table->string('nama_penulis');
            $table->unsignedBigInteger('id_pegawai')->nullable();
            $table->unsignedBigInteger('id_booking')->nullable();

            $table->foreign('id_pegawai')->references('id')->on('pegawai')->nullOnDelete();
            $table->foreign('id_booking')->references('id_booking')->on('booking')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporan');
    }
};
