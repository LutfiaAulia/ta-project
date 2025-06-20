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
        Schema::create('disposisi', function (Blueprint $table) {
            $table->id('id_disposisi');
            $table->text('isi');
            $table->date('tanggal');
            $table->text('tujuan');
            $table->text('catatan');
            $table->unsignedBigInteger('id_surat');
            $table->unsignedBigInteger('id_pegawai');

            $table->foreign('id_surat')->references('id_surat')->on('surat_masuk')->cascadeOnDelete();
            $table->foreign('id_pegawai')->references('id')->on('pegawai')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('disposisi');
    }
};
