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
        Schema::create('booking_pelayananumkm', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_booking');
            $table->unsignedBigInteger('id_pelayanan');
            $table->bigInteger('total_aset')->nullable();
            $table->bigInteger('omset')->nullable();
            $table->bigInteger('pengeluaran')->nullable();
            $table->bigInteger('pendapat_bersih')->nullable();
            $table->string('pelatihan')->nullable();
            $table->text('permasalahan')->nullable();
            $table->timestamps();

            $table->foreign('id_booking')->references('id_booking')->on('booking')->onDelete('cascade');
            $table->foreign('id_pelayanan')->references('id_pelayanan')->on('pelayanan_umkm')->onDelete('cascade');
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('umkm_pelayananumkm');
    }
};
