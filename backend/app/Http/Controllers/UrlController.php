<?php

namespace App\Http\Controllers;
use App\Models\url;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UrlController extends Controller
{
    public function access($slug)
    {
        $link_access = url::where('slug', $slug)->first();
        // dd($link_access->link);
        return redirect()->away($link_access->link);
    }
    public function store(Request $request)
    {
            $url  = \URL::to('/');
            if($request->link_custom){

                // kondisi link custom sudah terdaftar
                $url_custom = url::where('slug', $request->link_custom)->first();
                if($url_custom){
                    $balasan = [
                        'status' => false,
                        'message' => 'waduh, link udah pernah dipakai nih, coba yang lain ya..'
                    ];
                    return response()->json($balasan);
                }
                
                // kondisi link custom belum terdaftar
                else{
                $sublink = Str::slug($request->link_custom);
                
                url::create([
                    'link'=>$request->link,
                    'slug'=>Str::slug($request->link_custom)
                ]);
            }
            }
            
            // link random
            else{
                $sublink = Str::random(6);

                url::create([
                    'link'=>$request->link,
                    'slug'=>$sublink
                ]);
            }
            return response()->json($url.'/'.$sublink);
    }
    // make code qr
    public function code(Request $request)
    {
        return $request->code;
    }
}
