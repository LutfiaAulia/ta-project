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
        Schema::create('profil_organisasi', function (Blueprint $table) {
            $table->id('id_proforg');
            $table->text('visi')->nullable();
            $table->text('misi')->nullable();
            $table->text('tugas')->nullable();
            $table->text('fungsi')->nullable();
            $table->text('maklumat_pelayanan')->nullable();
            $table->string('gambar_struktur')->nullable();
            $table->unsignedBigInteger('id_pegawai');

            $table->foreign('id_pegawai')->references('id')->on('pegawai')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profil_organisasi');
    }
};
