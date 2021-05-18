<?php

namespace App\Http\Controllers;
use App\Models\url;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UrlController extends Controller
{
    public function access($link_short)
    {
        $link_access = url::where('link_short', $link_short)->first();
        // dd($link_access->link);
        return redirect()->away($link_access->link);
    }
    public function store(Request $request)
    {
        // Validasi
        $request->validate([
            'link' => 'required'
        ]);

        // Kondisi
        $link_db = url::where('link', $request->link)->first();
        
        //link sudah terdaftar
        if($link_db){
            $balasan = [
                'status' => false,
                'message' => 'waduh, link udah pernah dipakai nih, coba yang lain ya..'
            ];
            return response()->json($balasan);
        }
        
        // link belum terdaftar
        else{
            $url  = \URL::to('/');
            if($request->link_custom){

                // kondisi link custom sudah terdaftar
                $url_custom = url::where('link_short', $request->link_custom)->first();
                if($url_custom){
                    $balasan = [
                        'status' => false,
                        'message' => 'waduh, link udah pernah dipakai nih, coba yang lain ya..'
                    ];
                    return response()->json($balasan);
                }
                
                // kondisi link custom belum terdaftar
                else{
                $sublink = $request->link_custom;
                
                url::create([
                    'link'=>$request->link,
                    'link_short'=>$request->link_custom
                ]);
            }
            }
            
            // link random
            else{
                $link_short = Str::random(6);
                $sublink = $link_short;

                url::create([
                    'link'=>$request->link,
                    'link_short'=>$link_short
                ]);
            }
            return response()->json($url.'/'.$sublink);
        }
    }
    // make code qr
    public function code(Request $request)
    {
        return $request->code;
    }
}
