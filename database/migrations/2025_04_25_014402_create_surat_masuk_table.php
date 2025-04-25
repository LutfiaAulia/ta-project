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
        Schema::create('surat_masuk', function (Blueprint $table) {
            $table->id('id_surat');
            $table->string('no_surat');
            $table->string('asal_surat');
            $table->text('perihal');
            $table->text('keterangan');
            $table->date('tgl_diterima');
            $table->date('tgl_surat');
            $table->string('surat');
            $table->string('nip');
            $table->foreign('nip')->references('nip')->on('pegawai')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_masuk');
    }
};
