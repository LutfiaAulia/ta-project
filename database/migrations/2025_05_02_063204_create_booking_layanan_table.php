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
        Schema::create('booking_layanan', function (Blueprint $table) {
            $table->id('id_bokil');
            $table->unsignedBigInteger('id_booking');
            $table->unsignedBigInteger('id_layanan');
            $table->foreign('id_booking')->references('id_booking')->on('booking')->onDelete('cascade');
            $table->foreign('id_layanan')->references('id_layanan')->on('layanan')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking_layanan');
    }
};
