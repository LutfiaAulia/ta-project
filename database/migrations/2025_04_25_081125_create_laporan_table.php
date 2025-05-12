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
            $table->text('penutup');
            $table->string('nama_penulis');
            $table->string('ttd');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->unsignedBigInteger('id_pelayanan');
            $table->foreign('id_pelayanan')->references('id_pelayanan')->on('pelayanan_umkm')->onDelete('cascade');
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
