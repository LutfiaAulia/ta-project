<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('pelayanan_umkm', function (Blueprint $table) {
            $table->id('id_pelayanan');
            $table->string('nama_lengkap');
            $table->string('nik', 16);
            $table->text('alamat_lengkap');
            $table->string('email')->nullable();
            $table->string('no_hp');
            $table->string('nama_usaha');
            $table->string('bentuk_usaha');
            $table->string('sektor_usaha');
            $table->string('legalitas_usaha')->nullable();
            $table->string('pembiayaan')->nullable();
            $table->string('nib')->nullable();
            $table->text('alamat_usaha');
            $table->bigInteger('modal_usaha')->nullable();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pelayanan_umkm');
    }
};
