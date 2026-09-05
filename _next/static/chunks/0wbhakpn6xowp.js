(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,49543,e=>{"use strict";let t;var r,a,n,i,o,s,l,c,u,f,h,d,p,m,v,g,y,w,_,M,x,S,b,A,E,T=e.i(72525),I=e.i(62560),C=e.i(10835),R=e.i(16076),F=e.i(84096),P=e.i(44222),z=e.i(48402),O=e.i(6399),L=e.i(40054),U=e.i(39360),U=U,D=U,k=P;let H=parseInt(P.REVISION.replace(/\D+/g,""));class B extends k.Mesh{constructor(e,t){var r,a;const n=(e=>e&&e.isCubeTexture)(e),i=Math.floor(Math.log2((null!=(a=n?null==(r=e.image[0])?void 0:r.width:e.image.width)?a:1024)/4)),o=Math.pow(2,i),s=3*Math.max(o,112),l=`
        varying vec3 vWorldPosition;
        void main() 
        {
            vec4 worldPosition = ( modelMatrix * vec4( position, 1.0 ) );
            vWorldPosition = worldPosition.xyz;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
        `,c=[n?"#define ENVMAP_TYPE_CUBE":"",`#define CUBEUV_TEXEL_WIDTH ${1/s}`,`#define CUBEUV_TEXEL_HEIGHT ${1/(4*o)}`,`#define CUBEUV_MAX_MIP ${i}.0`].join("\n")+`
        #define ENVMAP_TYPE_CUBE_UV
        varying vec3 vWorldPosition;
        uniform float radius;
        uniform float height;
        uniform float angle;
        #ifdef ENVMAP_TYPE_CUBE
            uniform samplerCube map;
        #else
            uniform sampler2D map;
        #endif
        // From: https://www.shadertoy.com/view/4tsBD7
        float diskIntersectWithBackFaceCulling( vec3 ro, vec3 rd, vec3 c, vec3 n, float r ) 
        {
            float d = dot ( rd, n );
            
            if( d > 0.0 ) { return 1e6; }
            
            vec3  o = ro - c;
            float t = - dot( n, o ) / d;
            vec3  q = o + rd * t;
            
            return ( dot( q, q ) < r * r ) ? t : 1e6;
        }
        // From: https://www.iquilezles.org/www/articles/intersectors/intersectors.htm
        float sphereIntersect( vec3 ro, vec3 rd, vec3 ce, float ra ) 
        {
            vec3 oc = ro - ce;
            float b = dot( oc, rd );
            float c = dot( oc, oc ) - ra * ra;
            float h = b * b - c;
            
            if( h < 0.0 ) { return -1.0; }
            
            h = sqrt( h );
            
            return - b + h;
        }
        vec3 project() 
        {
            vec3 p = normalize( vWorldPosition );
            vec3 camPos = cameraPosition;
            camPos.y -= height;
            float intersection = sphereIntersect( camPos, p, vec3( 0.0 ), radius );
            if( intersection > 0.0 ) {
                
                vec3 h = vec3( 0.0, - height, 0.0 );
                float intersection2 = diskIntersectWithBackFaceCulling( camPos, p, h, vec3( 0.0, 1.0, 0.0 ), radius );
                p = ( camPos + min( intersection, intersection2 ) * p ) / radius;
            } else {
                p = vec3( 0.0, 1.0, 0.0 );
            }
            return p;
        }
        #include <common>
        #include <cube_uv_reflection_fragment>
        void main() 
        {
            vec3 projectedWorldPosition = project();
            
            #ifdef ENVMAP_TYPE_CUBE
                vec3 outcolor = textureCube( map, projectedWorldPosition ).rgb;
            #else
                vec3 direction = normalize( projectedWorldPosition );
                vec2 uv = equirectUv( direction );
                vec3 outcolor = texture2D( map, uv ).rgb;
            #endif
            gl_FragColor = vec4( outcolor, 1.0 );
            #include <tonemapping_fragment>
            #include <${H>=154?"colorspace_fragment":"encodings_fragment"}>
        }
        `,u={map:{value:e},height:{value:(null==t?void 0:t.height)||15},radius:{value:(null==t?void 0:t.radius)||100}};super(new k.IcosahedronGeometry(1,16),new k.ShaderMaterial({uniforms:u,fragmentShader:c,vertexShader:l,side:k.DoubleSide}))}set radius(e){this.material.uniforms.radius.value=e}get radius(){return this.material.uniforms.radius.value}set height(e){this.material.uniforms.height.value=e}get height(){return this.material.uniforms.height.value}}var N=U,j=P;class $ extends j.DataTextureLoader{constructor(e){super(e),this.type=j.HalfFloatType}parse(e){let t,r,a,n=function(e,t){switch(e){case 1:throw Error("THREE.RGBELoader: Read Error: "+(t||""));case 2:throw Error("THREE.RGBELoader: Write Error: "+(t||""));case 3:throw Error("THREE.RGBELoader: Bad File Format: "+(t||""));default:throw Error("THREE.RGBELoader: Memory Error: "+(t||""))}},i=function(e,t,r){t=t||1024;let a=e.pos,n=-1,i=0,o="",s=String.fromCharCode.apply(null,new Uint16Array(e.subarray(a,a+128)));for(;0>(n=s.indexOf("\n"))&&i<t&&a<e.byteLength;)o+=s,i+=s.length,a+=128,s+=String.fromCharCode.apply(null,new Uint16Array(e.subarray(a,a+128)));return -1<n&&(!1!==r&&(e.pos+=i+n+1),o+s.slice(0,n))},o=new Uint8Array(e);o.pos=0;let s=function(e){let t,r,a=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,o=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,s=/^\s*FORMAT=(\S+)\s*$/,l=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,c={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};for(!(e.pos>=e.byteLength)&&(t=i(e))||n(1,"no header found"),(r=t.match(/^#\?(\S+)/))||n(3,"bad initial token"),c.valid|=1,c.programtype=r[1],c.string+=t+"\n";!1!==(t=i(e));){if(c.string+=t+"\n","#"===t.charAt(0)){c.comments+=t+"\n";continue}if((r=t.match(a))&&(c.gamma=parseFloat(r[1])),(r=t.match(o))&&(c.exposure=parseFloat(r[1])),(r=t.match(s))&&(c.valid|=2,c.format=r[1]),(r=t.match(l))&&(c.valid|=4,c.height=parseInt(r[1],10),c.width=parseInt(r[2],10)),2&c.valid&&4&c.valid)break}return 2&c.valid||n(3,"missing format specifier"),4&c.valid||n(3,"missing image size specifier"),c}(o),l=s.width,c=s.height,u=function(e,t,r){if(t<8||t>32767||2!==e[0]||2!==e[1]||128&e[2])return new Uint8Array(e);t!==(e[2]<<8|e[3])&&n(3,"wrong scanline width");let a=new Uint8Array(4*t*r);a.length||n(4,"unable to allocate buffer space");let i=0,o=0,s=4*t,l=new Uint8Array(4),c=new Uint8Array(s),u=r;for(;u>0&&o<e.byteLength;){o+4>e.byteLength&&n(1),l[0]=e[o++],l[1]=e[o++],l[2]=e[o++],l[3]=e[o++],(2!=l[0]||2!=l[1]||(l[2]<<8|l[3])!=t)&&n(3,"bad rgbe scanline format");let r=0,f;for(;r<s&&o<e.byteLength;){let t=(f=e[o++])>128;if(t&&(f-=128),(0===f||r+f>s)&&n(3,"bad scanline data"),t){let t=e[o++];for(let e=0;e<f;e++)c[r++]=t}else c.set(e.subarray(o,o+f),r),r+=f,o+=f}for(let e=0;e<t;e++){let r=0;a[i]=c[e+r],r+=t,a[i+1]=c[e+r],r+=t,a[i+2]=c[e+r],r+=t,a[i+3]=c[e+r],i+=4}u--}return a}(o.subarray(o.pos),l,c);switch(this.type){case j.FloatType:let f=new Float32Array(4*(a=u.length/4));for(let e=0;e<a;e++)!function(e,t,r,a){let n=Math.pow(2,e[t+3]-128)/255;r[a+0]=e[t+0]*n,r[a+1]=e[t+1]*n,r[a+2]=e[t+2]*n,r[a+3]=1}(u,4*e,f,4*e);t=f,r=j.FloatType;break;case j.HalfFloatType:let h=new Uint16Array(4*(a=u.length/4));for(let e=0;e<a;e++)!function(e,t,r,a){let n=Math.pow(2,e[t+3]-128)/255;r[a+0]=j.DataUtils.toHalfFloat(Math.min(e[t+0]*n,65504)),r[a+1]=j.DataUtils.toHalfFloat(Math.min(e[t+1]*n,65504)),r[a+2]=j.DataUtils.toHalfFloat(Math.min(e[t+2]*n,65504)),r[a+3]=j.DataUtils.toHalfFloat(1)}(u,4*e,h,4*e);t=h,r=j.HalfFloatType;break;default:throw Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:l,height:c,data:t,header:s.string,gamma:s.gamma,exposure:s.exposure,type:r}}setDataType(e){return this.type=e,this}load(e,t,r,a){return super.load(e,function(e,r){switch(e.type){case j.FloatType:case j.HalfFloatType:"colorSpace"in e?e.colorSpace="srgb-linear":e.encoding=3e3,e.minFilter=j.LinearFilter,e.magFilter=j.LinearFilter,e.generateMipmaps=!1,e.flipY=!0}t&&t(e,r)},r,a)}}var V=P,G={},W=function(e,t,r,a,n){var i=new Worker(G[t]||(G[t]=URL.createObjectURL(new Blob([e],{type:"text/javascript"}))));return i.onerror=function(e){return n(e.error,null)},i.onmessage=function(e){return n(null,e.data)},i.postMessage(r,a),i},q=Uint8Array,X=Uint16Array,Y=Uint32Array,Z=new q([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),K=new q([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Q=new q([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),J=function(e,t){for(var r=new X(31),a=0;a<31;++a)r[a]=t+=1<<e[a-1];for(var n=new Y(r[30]),a=1;a<30;++a)for(var i=r[a];i<r[a+1];++i)n[i]=i-r[a]<<5|a;return[r,n]},ee=J(Z,2),et=ee[0],er=ee[1];et[28]=258,er[258]=28;for(var ea=J(K,0),en=ea[0],ei=ea[1],eo=new X(32768),es=0;es<32768;++es){var el=(43690&es)>>>1|(21845&es)<<1;el=(61680&(el=(52428&el)>>>2|(13107&el)<<2))>>>4|(3855&el)<<4,eo[es]=((65280&el)>>>8|(255&el)<<8)>>>1}for(var ec=function(e,t,r){for(var a,n=e.length,i=0,o=new X(t);i<n;++i)++o[e[i]-1];var s=new X(t);for(i=0;i<t;++i)s[i]=s[i-1]+o[i-1]<<1;if(r){a=new X(1<<t);var l=15-t;for(i=0;i<n;++i)if(e[i])for(var c=i<<4|e[i],u=t-e[i],f=s[e[i]-1]++<<u,h=f|(1<<u)-1;f<=h;++f)a[eo[f]>>>l]=c}else for(i=0,a=new X(n);i<n;++i)e[i]&&(a[i]=eo[s[e[i]-1]++]>>>15-e[i]);return a},eu=new q(288),es=0;es<144;++es)eu[es]=8;for(var es=144;es<256;++es)eu[es]=9;for(var es=256;es<280;++es)eu[es]=7;for(var es=280;es<288;++es)eu[es]=8;for(var ef=new q(32),es=0;es<32;++es)ef[es]=5;var eh=ec(eu,9,0),ed=ec(eu,9,1),ep=ec(ef,5,0),em=ec(ef,5,1),ev=function(e){for(var t=e[0],r=1;r<e.length;++r)e[r]>t&&(t=e[r]);return t},eg=function(e,t,r){var a=t/8|0;return(e[a]|e[a+1]<<8)>>(7&t)&r},ey=function(e,t){var r=t/8|0;return(e[r]|e[r+1]<<8|e[r+2]<<16)>>(7&t)},ew=function(e){return(e/8|0)+(7&e&&1)},e_=function(e,t,r){(null==t||t<0)&&(t=0),(null==r||r>e.length)&&(r=e.length);var a=new(e instanceof X?X:e instanceof Y?Y:q)(r-t);return a.set(e.subarray(t,r)),a},eM=function(e,t,r){var a=e.length;if(!a||r&&!r.l&&a<5)return t||new q(0);var n=!t||r,i=!r||r.i;r||(r={}),t||(t=new q(3*a));var o=function(e){var r=t.length;if(e>r){var a=new q(Math.max(2*r,e));a.set(t),t=a}},s=r.f||0,l=r.p||0,c=r.b||0,u=r.l,f=r.d,h=r.m,d=r.n,p=8*a;do{if(!u){r.f=s=eg(e,l,1);var m=eg(e,l+1,3);if(l+=3,m)if(1==m)u=ed,f=em,h=9,d=5;else if(2==m){var v=eg(e,l,31)+257,g=eg(e,l+10,15)+4,y=v+eg(e,l+5,31)+1;l+=14;for(var w=new q(y),_=new q(19),M=0;M<g;++M)_[Q[M]]=eg(e,l+3*M,7);l+=3*g;for(var x=ev(_),S=(1<<x)-1,b=ec(_,x,1),M=0;M<y;){var A=b[eg(e,l,S)];l+=15&A;var E=A>>>4;if(E<16)w[M++]=E;else{var T=0,I=0;for(16==E?(I=3+eg(e,l,3),l+=2,T=w[M-1]):17==E?(I=3+eg(e,l,7),l+=3):18==E&&(I=11+eg(e,l,127),l+=7);I--;)w[M++]=T}}var C=w.subarray(0,v),R=w.subarray(v);h=ev(C),d=ev(R),u=ec(C,h,1),f=ec(R,d,1)}else throw"invalid block type";else{var E=ew(l)+4,F=e[E-4]|e[E-3]<<8,P=E+F;if(P>a){if(i)throw"unexpected EOF";break}n&&o(c+F),t.set(e.subarray(E,P),c),r.b=c+=F,r.p=l=8*P;continue}if(l>p){if(i)throw"unexpected EOF";break}}n&&o(c+131072);for(var z=(1<<h)-1,O=(1<<d)-1,L=l;;L=l){var T=u[ey(e,l)&z],U=T>>>4;if((l+=15&T)>p){if(i)throw"unexpected EOF";break}if(!T)throw"invalid length/literal";if(U<256)t[c++]=U;else if(256==U){L=l,u=null;break}else{var D=U-254;if(U>264){var M=U-257,k=Z[M];D=eg(e,l,(1<<k)-1)+et[M],l+=k}var H=f[ey(e,l)&O],B=H>>>4;if(!H)throw"invalid distance";l+=15&H;var R=en[B];if(B>3){var k=K[B];R+=ey(e,l)&(1<<k)-1,l+=k}if(l>p){if(i)throw"unexpected EOF";break}n&&o(c+131072);for(var N=c+D;c<N;c+=4)t[c]=t[c-R],t[c+1]=t[c+1-R],t[c+2]=t[c+2-R],t[c+3]=t[c+3-R];c=N}}r.l=u,r.p=L,r.b=c,u&&(s=1,r.m=h,r.d=f,r.n=d)}while(!s)return c==t.length?t:e_(t,0,c)},ex=function(e,t,r){r<<=7&t;var a=t/8|0;e[a]|=r,e[a+1]|=r>>>8},eS=function(e,t,r){r<<=7&t;var a=t/8|0;e[a]|=r,e[a+1]|=r>>>8,e[a+2]|=r>>>16},eb=function(e,t){for(var r=[],a=0;a<e.length;++a)e[a]&&r.push({s:a,f:e[a]});var n=r.length,i=r.slice();if(!n)return[eF,0];if(1==n){var o=new q(r[0].s+1);return o[r[0].s]=1,[o,1]}r.sort(function(e,t){return e.f-t.f}),r.push({s:-1,f:25001});var s=r[0],l=r[1],c=0,u=1,f=2;for(r[0]={s:-1,f:s.f+l.f,l:s,r:l};u!=n-1;)s=r[r[c].f<r[f].f?c++:f++],l=r[c!=u&&r[c].f<r[f].f?c++:f++],r[u++]={s:-1,f:s.f+l.f,l:s,r:l};for(var h=i[0].s,a=1;a<n;++a)i[a].s>h&&(h=i[a].s);var d=new X(h+1),p=eA(r[u-1],d,0);if(p>t){var a=0,m=0,v=p-t,g=1<<v;for(i.sort(function(e,t){return d[t.s]-d[e.s]||e.f-t.f});a<n;++a){var y=i[a].s;if(d[y]>t)m+=g-(1<<p-d[y]),d[y]=t;else break}for(m>>>=v;m>0;){var w=i[a].s;d[w]<t?m-=1<<t-d[w]++-1:++a}for(;a>=0&&m;--a){var _=i[a].s;d[_]==t&&(--d[_],++m)}p=t}return[new q(d),p]},eA=function(e,t,r){return -1==e.s?Math.max(eA(e.l,t,r+1),eA(e.r,t,r+1)):t[e.s]=r},eE=function(e){for(var t=e.length;t&&!e[--t];);for(var r=new X(++t),a=0,n=e[0],i=1,o=function(e){r[a++]=e},s=1;s<=t;++s)if(e[s]==n&&s!=t)++i;else{if(!n&&i>2){for(;i>138;i-=138)o(32754);i>2&&(o(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(o(n),--i;i>6;i-=6)o(8304);i>2&&(o(i-3<<5|8208),i=0)}for(;i--;)o(n);i=1,n=e[s]}return[r.subarray(0,a),t]},eT=function(e,t){for(var r=0,a=0;a<t.length;++a)r+=e[a]*t[a];return r},eI=function(e,t,r){var a=r.length,n=ew(t+2);e[n]=255&a,e[n+1]=a>>>8,e[n+2]=255^e[n],e[n+3]=255^e[n+1];for(var i=0;i<a;++i)e[n+i+4]=r[i];return(n+4+a)*8},eC=function(e,t,r,a,n,i,o,s,l,c,u){ex(t,u++,r),++n[256];for(var f,h,d,p,m=eb(n,15),v=m[0],g=m[1],y=eb(i,15),w=y[0],_=y[1],M=eE(v),x=M[0],S=M[1],b=eE(w),A=b[0],E=b[1],T=new X(19),I=0;I<x.length;++I)T[31&x[I]]++;for(var I=0;I<A.length;++I)T[31&A[I]]++;for(var C=eb(T,7),R=C[0],F=C[1],P=19;P>4&&!R[Q[P-1]];--P);var z=c+5<<3,O=eT(n,eu)+eT(i,ef)+o,L=eT(n,v)+eT(i,w)+o+14+3*P+eT(T,R)+(2*T[16]+3*T[17]+7*T[18]);if(z<=O&&z<=L)return eI(t,u,e.subarray(l,l+c));if(ex(t,u,1+(L<O)),u+=2,L<O){f=ec(v,g,0),h=v,d=ec(w,_,0),p=w;var U=ec(R,F,0);ex(t,u,S-257),ex(t,u+5,E-1),ex(t,u+10,P-4),u+=14;for(var I=0;I<P;++I)ex(t,u+3*I,R[Q[I]]);u+=3*P;for(var D=[x,A],k=0;k<2;++k)for(var H=D[k],I=0;I<H.length;++I){var B=31&H[I];ex(t,u,U[B]),u+=R[B],B>15&&(ex(t,u,H[I]>>>5&127),u+=H[I]>>>12)}}else f=eh,h=eu,d=ep,p=ef;for(var I=0;I<s;++I)if(a[I]>255){var B=a[I]>>>18&31;eS(t,u,f[B+257]),u+=h[B+257],B>7&&(ex(t,u,a[I]>>>23&31),u+=Z[B]);var N=31&a[I];eS(t,u,d[N]),u+=p[N],N>3&&(eS(t,u,a[I]>>>5&8191),u+=K[N])}else eS(t,u,f[a[I]]),u+=h[a[I]];return eS(t,u,f[256]),u+h[256]},eR=new Y([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),eF=new q(0),eP=function(e,t,r,a,n,i){var o=e.length,s=new q(a+o+5*(1+Math.ceil(o/7e3))+n),l=s.subarray(a,s.length-n),c=0;if(!t||o<8)for(var u=0;u<=o;u+=65535){var f=u+65535;f<o?c=eI(l,c,e.subarray(u,f)):(l[u]=i,c=eI(l,c,e.subarray(u,o)))}else{for(var h=eR[t-1],d=h>>>13,p=8191&h,m=(1<<r)-1,v=new X(32768),g=new X(m+1),y=Math.ceil(r/3),w=2*y,_=function(t){return(e[t]^e[t+1]<<y^e[t+2]<<w)&m},M=new Y(25e3),x=new X(288),S=new X(32),b=0,A=0,u=0,E=0,T=0,I=0;u<o;++u){var C=_(u),R=32767&u,F=g[C];if(v[R]=F,g[C]=R,T<=u){var P=o-u;if((b>7e3||E>24576)&&P>423){c=eC(e,l,0,M,x,S,A,E,I,u-I,c),E=b=A=0,I=u;for(var z=0;z<286;++z)x[z]=0;for(var z=0;z<30;++z)S[z]=0}var O=2,L=0,U=p,D=R-F&32767;if(P>2&&C==_(u-D))for(var k=Math.min(d,P)-1,H=Math.min(32767,u),B=Math.min(258,P);D<=H&&--U&&R!=F;){if(e[u+O]==e[u+O-D]){for(var N=0;N<B&&e[u+N]==e[u+N-D];++N);if(N>O){if(O=N,L=D,N>k)break;for(var j=Math.min(D,N-2),$=0,z=0;z<j;++z){var V=u-D+z+32768&32767,G=v[V],W=V-G+32768&32767;W>$&&($=W,F=V)}}}F=v[R=F],D+=R-F+32768&32767}if(L){M[E++]=0x10000000|er[O]<<18|ei[L];var Q=31&er[O],J=31&ei[L];A+=Z[Q]+K[J],++x[257+Q],++S[J],T=u+O,++b}else M[E++]=e[u],++x[e[u]]}}c=eC(e,l,i,M,x,S,A,E,I,u-I,c),!i&&7&c&&(c=eI(l,c+1,eF))}return e_(s,0,a+ew(c)+n)},ez=function(){for(var e=new Int32Array(256),t=0;t<256;++t){for(var r=t,a=9;--a;)r=(1&r&&-0x12477ce0)^r>>>1;e[t]=r}return e}(),eO=function(){var e=-1;return{p:function(t){for(var r=e,a=0;a<t.length;++a)r=ez[255&r^t[a]]^r>>>8;e=r},d:function(){return~e}}},eL=function(){var e=1,t=0;return{p:function(r){for(var a=e,n=t,i=r.length,o=0;o!=i;){for(var s=Math.min(o+2655,i);o<s;++o)n+=a+=r[o];a=(65535&a)+15*(a>>16),n=(65535&n)+15*(n>>16)}e=a,t=n},d:function(){return e%=65521,t%=65521,(255&e)<<24|e>>>8<<16|(255&t)<<8|t>>>8}}},eU=function(e,t,r,a,n){return eP(e,null==t.level?6:t.level,null==t.mem?Math.ceil(1.5*Math.max(8,Math.min(13,Math.log(e.length)))):12+t.mem,r,a,!n)},eD=function(e,t){var r={};for(var a in e)r[a]=e[a];for(var a in t)r[a]=t[a];return r},ek=function(e,t,r){for(var a=e(),n=e.toString(),i=n.slice(n.indexOf("[")+1,n.lastIndexOf("]")).replace(/ /g,"").split(","),o=0;o<a.length;++o){var s=a[o],l=i[o];if("function"==typeof s){t+=";"+l+"=";var c=s.toString();if(s.prototype)if(-1!=c.indexOf("[native code]")){var u=c.indexOf(" ",8)+1;t+=c.slice(u,c.indexOf("(",u))}else for(var f in t+=c,s.prototype)t+=";"+l+".prototype."+f+"="+s.prototype[f].toString();else t+=c}else r[l]=s}return[t,r]},eH=[],eB=function(e){var t=[];for(var r in e)(e[r]instanceof q||e[r]instanceof X||e[r]instanceof Y)&&t.push((e[r]=new e[r].constructor(e[r])).buffer);return t},eN=function(e,t,r,a){if(!eH[r]){for(var n,i="",o={},s=e.length-1,l=0;l<s;++l)i=(n=ek(e[l],i,o))[0],o=n[1];eH[r]=ek(e[s],i,o)}var c=eD({},eH[r][1]);return W(eH[r][0]+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+t.toString()+"}",r,c,eB(c),a)},ej=function(){return[q,X,Y,Z,K,Q,et,en,ed,em,eo,ec,ev,eg,ey,ew,e_,eM,tr,eW,eq]},e$=function(){return[q,X,Y,Z,K,Q,er,ei,eh,eu,ep,ef,eo,eR,eF,ec,ex,eS,eb,eA,eE,eT,eI,eC,ew,e_,eP,eU,e9,eW]},eV=function(){return[e1,e2]},eG=function(){return[e4]},eW=function(e){return postMessage(e,[e.buffer])},eq=function(e){return e&&e.size&&new q(e.size)},eX=function(e){return e.ondata=function(e,t){return postMessage([e,t],[e.buffer])},function(t){return e.push(t.data[0],t.data[1])}},eY=function(e,t,r,a,n){var i,o=eN(e,a,n,function(e,r){e?(o.terminate(),t.ondata.call(t,e)):(r[1]&&o.terminate(),t.ondata.call(t,e,r[0],r[1]))});o.postMessage(r),t.push=function(e,r){if(i)throw"stream finished";if(!t.ondata)throw"no stream handler";o.postMessage([e,i=r],[e.buffer])},t.terminate=function(){o.terminate()}},eZ=function(e,t){return e[t]|e[t+1]<<8},eK=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},eQ=function(e,t){return eK(e,t)+0x100000000*eK(e,t+4)},eJ=function(e,t,r){for(;r;++t)e[t]=r,r>>>=8},e0=function(e,t){var r=t.filename;if(e[0]=31,e[1]=139,e[2]=8,e[8]=t.level<2?4:2*(9==t.level),e[9]=3,0!=t.mtime&&eJ(e,4,Math.floor(new Date(t.mtime||Date.now())/1e3)),r){e[3]=8;for(var a=0;a<=r.length;++a)e[a+10]=r.charCodeAt(a)}},e1=function(e){if(31!=e[0]||139!=e[1]||8!=e[2])throw"invalid gzip data";var t=e[3],r=10;4&t&&(r+=e[10]|(e[11]<<8)+2);for(var a=(t>>3&1)+(t>>4&1);a>0;a-=!e[r++]);return r+(2&t)},e2=function(e){var t=e.length;return(e[t-4]|e[t-3]<<8|e[t-2]<<16|e[t-1]<<24)>>>0},e3=function(e){return 10+(e.filename&&e.filename.length+1||0)},e5=function(e,t){var r=t.level,a=0==r?0:r<6?1:9==r?3:2;e[0]=120,e[1]=a<<6|(a?32-2*a:1)},e4=function(e){if((15&e[0])!=8||e[0]>>>4>7||(e[0]<<8|e[1])%31)throw"invalid zlib data";if(32&e[1])throw"invalid zlib data: preset dictionaries not supported"};function e6(e,t){return t||"function"!=typeof e||(t=e,e={}),this.ondata=t,e}var e8=function(){function e(e,t){t||"function"!=typeof e||(t=e,e={}),this.ondata=t,this.o=e||{}}return e.prototype.p=function(e,t){this.ondata(eU(e,this.o,0,0,!t),t)},e.prototype.push=function(e,t){if(this.d)throw"stream finished";if(!this.ondata)throw"no stream handler";this.d=t,this.p(e,t||!1)},e}(),e7=function(e,t){eY([e$,function(){return[eX,e8]}],this,e6.call(this,e,t),function(e){onmessage=eX(new e8(e.data))},6)};function e9(e,t){return eU(e,t||{},0,0)}var te=function(){function e(e){this.s={},this.p=new q(0),this.ondata=e}return e.prototype.e=function(e){if(this.d)throw"stream finished";if(!this.ondata)throw"no stream handler";var t=this.p.length,r=new q(t+e.length);r.set(this.p),r.set(e,t),this.p=r},e.prototype.c=function(e){this.d=this.s.i=e||!1;var t=this.s.b,r=eM(this.p,this.o,this.s);this.ondata(e_(r,t,this.s.b),this.d),this.o=e_(r,this.s.b-32768),this.s.b=this.o.length,this.p=e_(this.p,this.s.p/8|0),this.s.p&=7},e.prototype.push=function(e,t){this.e(e),this.c(t)},e}(),tt=function(e){this.ondata=e,eY([ej,function(){return[eX,te]}],this,0,function(){onmessage=eX(new te)},7)};function tr(e,t){return eM(e,t)}(function(){function e(e,t){this.c=eO(),this.l=0,this.v=1,e8.call(this,e,t)}e.prototype.push=function(e,t){e8.prototype.push.call(this,e,t)},e.prototype.p=function(e,t){this.c.p(e),this.l+=e.length;var r=eU(e,this.o,this.v&&e3(this.o),t&&8,!t);this.v&&(e0(r,this.o),this.v=0),t&&(eJ(r,r.length-8,this.c.d()),eJ(r,r.length-4,this.l)),this.ondata(r,t)}})();var ta=function(){function e(e){this.v=1,te.call(this,e)}return e.prototype.push=function(e,t){if(te.prototype.e.call(this,e),this.v){var r=this.p.length>3?e1(this.p):4;if(r>=this.p.length&&!t)return;this.p=this.p.subarray(r),this.v=0}if(t){if(this.p.length<8)throw"invalid gzip stream";this.p=this.p.subarray(0,-8)}te.prototype.c.call(this,t)},e}(),tn=function(e){this.ondata=e,eY([ej,eV,function(){return[eX,te,ta]}],this,0,function(){onmessage=eX(new ta)},9)},ti=(function(){function e(e,t){this.c=eL(),this.v=1,e8.call(this,e,t)}e.prototype.push=function(e,t){e8.prototype.push.call(this,e,t)},e.prototype.p=function(e,t){this.c.p(e);var r=eU(e,this.o,this.v&&2,t&&4,!t);this.v&&(e5(r,this.o),this.v=0),t&&eJ(r,r.length-4,this.c.d()),this.ondata(r,t)}}(),function(){function e(e){this.v=1,te.call(this,e)}return e.prototype.push=function(e,t){if(te.prototype.e.call(this,e),this.v){if(this.p.length<2&&!t)return;this.p=this.p.subarray(2),this.v=0}if(t){if(this.p.length<4)throw"invalid zlib stream";this.p=this.p.subarray(0,-4)}te.prototype.c.call(this,t)},e}()),to=function(e){this.ondata=e,eY([ej,eG,function(){return[eX,te,ti]}],this,0,function(){onmessage=eX(new ti)},11)};function ts(e,t){return eM((e4(e),e.subarray(2,-4)),t)}var tl=function(){function e(e){this.G=ta,this.I=te,this.Z=ti,this.ondata=e}return e.prototype.push=function(e,t){if(!this.ondata)throw"no stream handler";if(this.s)this.s.push(e,t);else{if(this.p&&this.p.length){var r=new q(this.p.length+e.length);r.set(this.p),r.set(e,this.p.length)}else this.p=e;if(this.p.length>2){var a=this,n=function(){a.ondata.apply(a,arguments)};this.s=31==this.p[0]&&139==this.p[1]&&8==this.p[2]?new this.G(n):(15&this.p[0])!=8||this.p[0]>>4>7||(this.p[0]<<8|this.p[1])%31?new this.I(n):new this.Z(n),this.s.push(this.p,t),this.p=null}}},e}();(function(e){this.G=tn,this.I=tt,this.Z=to,this.ondata=e}).prototype.push=function(e,t){tl.prototype.push.call(this,e,t)};var tc="u">typeof TextEncoder&&new TextEncoder,tu="u">typeof TextDecoder&&new TextDecoder,tf=0;try{tu.decode(eF,{stream:!0}),tf=1}catch(e){}var th=function(e){for(var t="",r=0;;){var a=e[r++],n=(a>127)+(a>223)+(a>239);if(r+n>e.length)return[t,e_(e,r-1)];n?3==n?t+=String.fromCharCode(55296|(a=((15&a)<<18|(63&e[r++])<<12|(63&e[r++])<<6|63&e[r++])-65536)>>10,56320|1023&a):1&n?t+=String.fromCharCode((31&a)<<6|63&e[r++]):t+=String.fromCharCode((15&a)<<12|(63&e[r++])<<6|63&e[r++]):t+=String.fromCharCode(a)}};function td(e,t){if(t){for(var r=new q(e.length),a=0;a<e.length;++a)r[a]=e.charCodeAt(a);return r}if(tc)return tc.encode(e);for(var n=e.length,i=new q(e.length+(e.length>>1)),o=0,s=function(e){i[o++]=e},a=0;a<n;++a){if(o+5>i.length){var l=new q(o+8+(n-a<<1));l.set(i),i=l}var c=e.charCodeAt(a);c<128||t?s(c):(c<2048?s(192|c>>6):(c>55295&&c<57344?(s(240|(c=65536+(1047552&c)|1023&e.charCodeAt(++a))>>18),s(128|c>>12&63)):s(224|c>>12),s(128|c>>6&63)),s(128|63&c))}return e_(i,0,o)}(function(e){this.ondata=e,tf?this.t=new TextDecoder:this.p=eF}).prototype.push=function(e,t){if(!this.ondata)throw"no callback";if(t=!!t,this.t){if(this.ondata(this.t.decode(e,{stream:!0}),t),t){if(this.t.decode().length)throw"invalid utf-8 data";this.t=null}return}if(!this.p)throw"stream finished";var r=new q(this.p.length+e.length);r.set(this.p),r.set(e,this.p.length);var a=th(r),n=a[0],i=a[1];if(t){if(i.length)throw"invalid utf-8 data";this.p=null}else this.p=i;this.ondata(n,t)},(function(e){this.ondata=e}).prototype.push=function(e,t){if(!this.ondata)throw"no callback";if(this.d)throw"stream finished";this.ondata(td(e),this.d=t||!1)};var tp=function(e){return 1==e?3:e<6?2:+(9==e)},tm=function(e,t){for(;1!=eZ(e,t);t+=4+eZ(e,t+2));return[eQ(e,t+12),eQ(e,t+4),eQ(e,t+20)]},tv=function(e){var t=0;if(e)for(var r in e){var a=e[r].length;if(a>65535)throw"extra field too long";t+=a+4}return t},tg=function(e,t,r,a,n,i,o,s){var l=a.length,c=r.extra,u=s&&s.length,f=tv(c);eJ(e,t,null!=o?0x2014b50:0x4034b50),t+=4,null!=o&&(e[t++]=20,e[t++]=r.os),e[t]=20,t+=2,e[t++]=r.flag<<1|(null==i&&8),e[t++]=n&&8,e[t++]=255&r.compression,e[t++]=r.compression>>8;var h=new Date(null==r.mtime?Date.now():r.mtime),d=h.getFullYear()-1980;if(d<0||d>119)throw"date not in range 1980-2099";if(eJ(e,t,d<<25|h.getMonth()+1<<21|h.getDate()<<16|h.getHours()<<11|h.getMinutes()<<5|h.getSeconds()>>>1),t+=4,null!=i&&(eJ(e,t,r.crc),eJ(e,t+4,i),eJ(e,t+8,r.size)),eJ(e,t+12,l),eJ(e,t+14,f),t+=16,null!=o&&(eJ(e,t,u),eJ(e,t+6,r.attrs),eJ(e,t+10,o),t+=14),e.set(a,t),t+=l,f)for(var p in c){var m=c[p],v=m.length;eJ(e,t,+p),eJ(e,t+2,v),e.set(m,t+4),t+=4+v}return u&&(e.set(s,t),t+=u),t},ty=function(e,t,r,a,n){eJ(e,t,0x6054b50),eJ(e,t+8,r),eJ(e,t+10,r),eJ(e,t+12,a),eJ(e,t+16,n)},tw=function(){function e(e){this.filename=e,this.c=eO(),this.size=0,this.compression=0}return e.prototype.process=function(e,t){this.ondata(null,e,t)},e.prototype.push=function(e,t){if(!this.ondata)throw"no callback - add to ZIP archive before pushing";this.c.p(e),this.size+=e.length,t&&(this.crc=this.c.d()),this.process(e,t||!1)},e}();function t_(e,t){var r=this;t||(t={}),tw.call(this,e),this.d=new e8(t,function(e,t){r.ondata(null,e,t)}),this.compression=8,this.flag=tp(t.level)}function tM(e,t){var r=this;t||(t={}),tw.call(this,e),this.d=new e7(t,function(e,t,a){r.ondata(e,t,a)}),this.compression=8,this.flag=tp(t.level),this.terminate=this.d.terminate}function tx(e){this.ondata=e,this.u=[],this.d=1}t_.prototype.process=function(e,t){try{this.d.push(e,t)}catch(e){this.ondata(e,null,t)}},t_.prototype.push=function(e,t){tw.prototype.push.call(this,e,t)},tM.prototype.process=function(e,t){this.d.push(e,t)},tM.prototype.push=function(e,t){tw.prototype.push.call(this,e,t)},tx.prototype.add=function(e){var t=this;if(2&this.d)throw"stream finished";var r=td(e.filename),a=r.length,n=e.comment,i=n&&td(n),o=a!=e.filename.length||i&&n.length!=i.length,s=a+tv(e.extra)+30;if(a>65535)throw"filename too long";var l=new q(s);tg(l,0,e,r,o);var c=[l],u=function(){for(var e=0,r=c;e<r.length;e++){var a=r[e];t.ondata(null,a,!1)}c=[]},f=this.d;this.d=0;var h=this.u.length,d=eD(e,{f:r,u:o,o:i,t:function(){e.terminate&&e.terminate()},r:function(){if(u(),f){var e=t.u[h+1];e?e.r():t.d=1}f=1}}),p=0;e.ondata=function(r,a,n){if(r)t.ondata(r,a,n),t.terminate();else if(p+=a.length,c.push(a),n){var i=new q(16);eJ(i,0,0x8074b50),eJ(i,4,e.crc),eJ(i,8,p),eJ(i,12,e.size),c.push(i),d.c=p,d.b=s+p+16,d.crc=e.crc,d.size=e.size,f&&d.r(),f=1}else f&&u()},this.u.push(d)},tx.prototype.end=function(){var e=this;if(2&this.d){if(1&this.d)throw"stream finishing";throw"stream finished"}this.d?this.e():this.u.push({r:function(){1&e.d&&(e.u.splice(-1,1),e.e())},t:function(){}}),this.d=3},tx.prototype.e=function(){for(var e=0,t=0,r=0,a=0,n=this.u;a<n.length;a++){var i=n[a];r+=46+i.f.length+tv(i.extra)+(i.o?i.o.length:0)}for(var o=new q(r+22),s=0,l=this.u;s<l.length;s++){var i=l[s];tg(o,e,i,i.f,i.u,i.c,t,i.o),e+=46+i.f.length+tv(i.extra)+(i.o?i.o.length:0),t+=i.b}ty(o,e,this.u.length,r,t),this.ondata(null,o,!0),this.d=2},tx.prototype.terminate=function(){for(var e=0,t=this.u;e<t.length;e++)t[e].t();this.d=2};var tS=function(){function e(){}return e.prototype.push=function(e,t){this.ondata(null,e,t)},e.compression=0,e}();function tb(){var e=this;this.i=new te(function(t,r){e.ondata(null,t,r)})}function tA(e,t){var r=this;t<32e4?this.i=new te(function(e,t){r.ondata(null,e,t)}):(this.i=new tt(function(e,t,a){r.ondata(e,t,a)}),this.terminate=this.i.terminate)}function tE(e){this.onfile=e,this.k=[],this.o={0:tS},this.p=eF}tb.prototype.push=function(e,t){try{this.i.push(e,t)}catch(r){this.ondata(r,e,t)}},tb.compression=8,tA.prototype.push=function(e,t){this.i.terminate&&(e=e_(e,0)),this.i.push(e,t)},tA.compression=8,tE.prototype.push=function(e,t){var r=this;if(!this.onfile)throw"no callback";if(!this.p)throw"stream finished";if(this.c>0){var a=Math.min(this.c,e.length),n=e.subarray(0,a);if(this.c-=a,this.d?this.d.push(n,!this.c):this.k[0].push(n),(e=e.subarray(a)).length)return this.push(e,t)}else{var i=0,o=0,s=void 0,l=void 0;this.p.length?e.length?((l=new q(this.p.length+e.length)).set(this.p),l.set(e,this.p.length)):l=this.p:l=e;for(var c=l.length,u=this.c,f=u&&this.d,h=this;o<c-4&&"break"!==function(){var e=eK(l,o);if(0x4034b50==e){i=1,s=o,h.d=null,h.c=0;var t=eZ(l,o+6),a=eZ(l,o+8),n=8&t,f=eZ(l,o+26),d=eZ(l,o+28);if(c>o+30+f+d){var p,m,v=[];h.k.unshift(v),i=2;var g=eK(l,o+18),y=eK(l,o+22),w=function(e,t){if(t){for(var r="",a=0;a<e.length;a+=16384)r+=String.fromCharCode.apply(null,e.subarray(a,a+16384));return r}if(tu)return tu.decode(e);var n=th(e),i=n[0];if(n[1].length)throw"invalid utf-8 data";return i}(l.subarray(o+30,o+=30+f),!(2048&t));0xffffffff==g?(g=(p=n?[-2]:tm(l,o))[0],y=p[1]):n&&(g=-1),o+=d,h.c=g;var _={name:w,compression:a,start:function(){if(!_.ondata)throw"no callback";if(g){var e=r.o[a];if(!e)throw"unknown compression type "+a;(m=g<0?new e(w):new e(w,g,y)).ondata=function(e,t,r){_.ondata(e,t,r)};for(var t=0;t<v.length;t++){var n=v[t];m.push(n,!1)}r.k[0]==v&&r.c?r.d=m:m.push(eF,!0)}else _.ondata(null,eF,!0)},terminate:function(){m&&m.terminate&&m.terminate()}};g>=0&&(_.size=g,_.originalSize=y),h.onfile(_)}return"break"}if(u){if(0x8074b50==e)return s=o+=12+(-2==u&&8),i=3,h.c=0,"break";else if(0x2014b50==e)return s=o-=4,i=3,h.c=0,"break"}}();++o);if(this.p=eF,u<0){var d=i?l.subarray(0,s-12-(-2==u&&8)-(0x8074b50==eK(l,s-16)&&4)):l.subarray(0,o);f?f.push(d,!!i):this.k[+(2==i)].push(d)}if(2&i)return this.push(l.subarray(o),t);this.p=l.subarray(o)}if(t){if(this.c)throw"invalid zip file";this.p=null}},tE.prototype.register=function(e){this.o[e.compression]=e};let tT=H>=152;class tI extends V.DataTextureLoader{constructor(e){super(e),this.type=V.HalfFloatType}parse(e){let t={l:0,c:0,lc:0};function r(e,r,a,n,i){for(;a<e;)r=r<<8|A(n,i),a+=8;t.l=r>>(a-=e)&(1<<e)-1,t.c=r,t.lc=a}let a=Array(59),n={c:0,lc:0};function i(e,t,r,a){e=e<<8|A(r,a),t+=8,n.c=e,n.lc=t}let o={c:0,lc:0};function s(e,t,r,a,s,l,c,u,f,h){if(e==t){a<8&&(i(r,a,s,c),r=n.c,a=n.lc);var d=r>>(a-=8),d=new Uint8Array([d])[0];if(f.value+d>h)return!1;for(var p=u[f.value-1];d-- >0;)u[f.value++]=p}else{if(!(f.value<h))return!1;u[f.value++]=e}o.c=r,o.lc=a}function l(e){var t=65535&e;return t>32767?t-65536:t}let c={a:0,b:0};function u(e,t){var r=l(e),a=l(t),n=r+(1&a)+(a>>1),i=n-a;c.a=n,c.b=i}function f(e,t){var r=65535&t,a=(65535&e)-(r>>1)&65535;c.a=r+a-32768&65535,c.b=a}function h(e,l,c,u,f,h){var d=c.value,p=b(l,c),m=b(l,c);c.value+=4;var v=b(l,c);if(c.value+=4,p<0||p>=65537||m<0||m>=65537)throw"Something wrong with HUF_ENCSIZE";for(var g=Array(65537),y=Array(16384),w=0;w<16384;w++)y[w]={},y[w].len=0,y[w].lit=0,y[w].p=null;var _=u-(c.value-d);if(!function(e,n,i,o,s,l){for(var c=0,u=0;o<=s;o++){if(n.value-n.value>i)return!1;r(6,c,u,e,n);var f=t.l;if(c=t.c,u=t.lc,l[o]=f,63==f){if(n.value-n.value>i)throw"Something wrong with hufUnpackEncTable";r(8,c,u,e,n);var h=t.l+6;if(c=t.c,u=t.lc,o+h>s+1)throw"Something wrong with hufUnpackEncTable";for(;h--;)l[o++]=0;o--}else if(f>=59){var h=f-59+2;if(o+h>s+1)throw"Something wrong with hufUnpackEncTable";for(;h--;)l[o++]=0;o--}}!function(e){for(var t=0;t<=58;++t)a[t]=0;for(var t=0;t<65537;++t)a[e[t]]+=1;for(var r=0,t=58;t>0;--t){var n=r+a[t]>>1;a[t]=r,r=n}for(var t=0;t<65537;++t){var i=e[t];i>0&&(e[t]=i|a[i]++<<6)}}(l)}(e,c,_,p,m,g),v>8*(u-(c.value-d)))throw"Something wrong with hufUncompress";!function(e,t,r,a){for(;t<=r;t++){var n=e[t]>>6,i=63&e[t];if(n>>i)throw"Invalid table entry";if(i>14){var o=a[n>>i-14];if(o.len)throw"Invalid table entry";if(o.lit++,o.p){var s=o.p;o.p=Array(o.lit);for(var l=0;l<o.lit-1;++l)o.p[l]=s[l]}else o.p=[,];o.p[o.lit-1]=t}else if(i)for(var c=0,l=1<<14-i;l>0;l--){var o=a[(n<<14-i)+c];if(o.len||o.p)throw"Invalid table entry";o.len=i,o.lit=t,c++}}}(g,p,m,y),function(e,t,r,a,l,c,u,f,h,d){for(var p=0,m=0,v=Math.trunc(l.value+(c+7)/8);l.value<v;)for(i(p,m,r,l),p=n.c,m=n.lc;m>=14;){var g=t[p>>m-14&16383];if(g.len)m-=g.len,s(g.lit,u,p,m,r,a,l,h,d,f),p=o.c,m=o.lc;else{if(!g.p)throw"hufDecode issues";for(y=0;y<g.lit;y++){for(var y,w=63&e[g.p[y]];m<w&&l.value<v;)i(p,m,r,l),p=n.c,m=n.lc;if(m>=w&&e[g.p[y]]>>6==(p>>m-w&(1<<w)-1)){m-=w,s(g.p[y],u,p,m,r,a,l,h,d,f),p=o.c,m=o.lc;break}}if(y==g.lit)throw"hufDecode issues"}}var _=8-c&7;for(p>>=_,m-=_;m>0;){var g=t[p<<14-m&16383];if(g.len)m-=g.len,s(g.lit,u,p,m,r,a,l,h,d,f),p=o.c,m=o.lc;else throw"hufDecode issues"}}(g,y,e,l,c,v,m,h,f,{value:0})}function d(e){for(var t=1;t<e.length;t++){var r=e[t-1]+e[t]-128;e[t]=r}}function p(e,t){for(var r=0,a=Math.floor((e.length+1)/2),n=0,i=e.length-1;!(n>i)&&(t[n++]=e[r++],!(n>i));){;t[n++]=e[a++]}}function m(e){for(var t=e.byteLength,r=[],a=0,n=new DataView(e);t>0;){var i=n.getInt8(a++);if(i<0){var o=-i;t-=o+1;for(var s=0;s<o;s++)r.push(n.getUint8(a++))}else{var o=i;t-=2;for(var l=n.getUint8(a++),s=0;s<o+1;s++)r.push(l)}}return r}function v(e){return new DataView(e.array.buffer,e.offset.value,e.size)}function g(e){var t=new Uint8Array(m(e.viewer.buffer.slice(e.offset.value,e.offset.value+e.size))),r=new Uint8Array(t.length);return d(t),p(t,r),new DataView(r.buffer)}function y(e){var t=ts(e.array.slice(e.offset.value,e.offset.value+e.size)),r=new Uint8Array(t.length);return d(t),p(t,r),new DataView(r.buffer)}function w(e){for(var t=e.viewer,r={value:e.offset.value},a=new Uint16Array(e.width*e.scanlineBlockSize*(e.channels*e.type)),n=new Uint8Array(8192),i=0,o=Array(e.channels),s=0;s<e.channels;s++)o[s]={},o[s].start=i,o[s].end=o[s].start,o[s].nx=e.width,o[s].ny=e.lines,o[s].size=e.type,i+=o[s].nx*o[s].ny*o[s].size;var l=F(t,r),d=F(t,r);if(d>=8192)throw"Something is wrong with PIZ_COMPRESSION BITMAP_SIZE";if(l<=d)for(var s=0;s<d-l+1;s++)n[s+l]=E(t,r);var p=new Uint16Array(65536),m=function(e,t){for(var r=0,a=0;a<65536;++a)(0==a||e[a>>3]&1<<(7&a))&&(t[r++]=a);for(var n=r-1;r<65536;)t[r++]=0;return n}(n,p),v=b(t,r);h(e.array,t,r,v,a,i);for(var s=0;s<e.channels;++s)for(var g=o[s],y=0;y<o[s].size;++y)!function(e,t,r,a,n,i,o){for(var s=o<16384,l=r>n?n:r,h=1;h<=l;)h<<=1;for(h>>=1,d=h,h>>=1;h>=1;){for(var d,p,m,v,g,y=0,w=0+i*(n-d),_=i*h,M=i*d,x=a*h,S=a*d;y<=w;y+=M){for(var b=y,A=y+a*(r-d);b<=A;b+=S){var E=b+x,T=b+_,I=T+x;s?(u(e[b+t],e[T+t]),p=c.a,v=c.b,u(e[E+t],e[I+t]),m=c.a,g=c.b,u(p,m),e[b+t]=c.a,e[E+t]=c.b,u(v,g)):(f(e[b+t],e[T+t]),p=c.a,v=c.b,f(e[E+t],e[I+t]),m=c.a,g=c.b,f(p,m),e[b+t]=c.a,e[E+t]=c.b,f(v,g)),e[T+t]=c.a,e[I+t]=c.b}if(r&h){var T=b+_;s?u(e[b+t],e[T+t]):f(e[b+t],e[T+t]),p=c.a,e[T+t]=c.b,e[b+t]=p}}if(n&h)for(var b=y,A=y+a*(r-d);b<=A;b+=S){var E=b+x;s?u(e[b+t],e[E+t]):f(e[b+t],e[E+t]),p=c.a,e[E+t]=c.b,e[b+t]=p}d=h,h>>=1}}(a,g.start+y,g.nx,g.size,g.ny,g.nx*g.size,m);for(var w=i,_=0;_<w;++_)a[_]=p[a[_]];for(var M=0,x=new Uint8Array(a.buffer.byteLength),S=0;S<e.lines;S++)for(var A=0;A<e.channels;A++){var g=o[A],T=g.nx*g.size,I=new Uint8Array(a.buffer,2*g.end,2*T);x.set(I,M),M+=2*T,g.end+=T}return new DataView(x.buffer)}function _(e){var t=ts(e.array.slice(e.offset.value,e.offset.value+e.size));let r=e.lines*e.channels*e.width,a=1==e.type?new Uint16Array(r):new Uint32Array(r),n=0,i=0,o=[,,,,];for(let r=0;r<e.lines;r++)for(let r=0;r<e.channels;r++){let r=0;switch(e.type){case 1:o[0]=n,o[1]=o[0]+e.width,n=o[1]+e.width;for(let n=0;n<e.width;++n)r+=t[o[0]++]<<8|t[o[1]++],a[i]=r,i++;break;case 2:o[0]=n,o[1]=o[0]+e.width,o[2]=o[1]+e.width,n=o[2]+e.width;for(let n=0;n<e.width;++n)r+=t[o[0]++]<<24|t[o[1]++]<<16|t[o[2]++]<<8,a[i]=r,i++}}return new DataView(a.buffer)}function M(e){var t=e.viewer,r={value:e.offset.value},a=new Uint8Array(e.width*e.lines*(e.channels*e.type*2)),n={version:T(t,r),unknownUncompressedSize:T(t,r),unknownCompressedSize:T(t,r),acCompressedSize:T(t,r),dcCompressedSize:T(t,r),rleCompressedSize:T(t,r),rleUncompressedSize:T(t,r),rleRawSize:T(t,r),totalAcUncompressedCount:T(t,r),totalDcUncompressedCount:T(t,r),acCompression:T(t,r)};if(n.version<2)throw"EXRLoader.parse: "+U.compression+" version "+n.version+" is unsupported";for(var i=[],o=F(t,r)-2;o>0;){var s=x(t.buffer,r),l=E(t,r),c=l>>2&3,u=new Int8Array([(l>>4)-1])[0],f=E(t,r);i.push({name:s,index:u,type:f,compression:c}),o-=s.length+3}for(var d=U.channels,p=Array(e.channels),v=0;v<e.channels;++v){var g=p[v]={},w=d[v];g.name=w.name,g.compression=0,g.decoded=!1,g.type=w.pixelType,g.pLinear=w.pLinear,g.width=e.width,g.height=e.lines}for(var _={idx:[,,,]},M=0;M<e.channels;++M)for(var g=p[M],v=0;v<i.length;++v){var S=i[v];g.name==S.name&&(g.compression=S.compression,S.index>=0&&(_.idx[S.index]=M),g.offset=M)}if(n.acCompressedSize>0)switch(n.acCompression){case 0:var b=new Uint16Array(n.totalAcUncompressedCount);h(e.array,t,r,n.acCompressedSize,b,n.totalAcUncompressedCount);break;case 1:var A=e.array.slice(r.value,r.value+n.totalAcUncompressedCount),I=ts(A),b=new Uint16Array(I.buffer);r.value+=n.totalAcUncompressedCount}if(n.dcCompressedSize>0){var C=new Uint16Array(y({array:e.array,offset:r,size:n.dcCompressedSize}).buffer);r.value+=n.dcCompressedSize}if(n.rleRawSize>0){var A=e.array.slice(r.value,r.value+n.rleCompressedSize),I=ts(A),P=m(I.buffer);r.value+=n.rleCompressedSize}for(var z=0,O=Array(p.length),v=0;v<O.length;++v)O[v]=[];for(var L=0;L<e.lines;++L)for(var D=0;D<p.length;++D)O[D].push(z),z+=p[D].width*e.type*2;!function(e,t,r,a,n,i){var o=new DataView(i.buffer),s=r[e.idx[0]].width,l=r[e.idx[0]].height,c=Math.floor(s/8),u=Math.ceil(s/8),f=Math.ceil(l/8),h=s-(u-1)*8,d=l-(f-1)*8,p={value:0},m=[,,,],v=[,,,],g=[,,,],y=[,,,],w=[,,,];for(let r=0;r<3;++r)w[r]=t[e.idx[r]],m[r]=r<1?0:m[r-1]+u*f,v[r]=new Float32Array(64),g[r]=new Uint16Array(64),y[r]=new Uint16Array(64*u);for(let t=0;t<f;++t){var _,M,x=8;t==f-1&&(x=d);var S=8;for(let e=0;e<u;++e){e==u-1&&(S=h);for(let e=0;e<3;++e){g[e].fill(0),g[e][0]=n[m[e]++],function(e,t,r){for(var a,n=1;n<64;)65280==(a=t[e.value])?n=64:a>>8==255?n+=255&a:(r[n]=a,n++),e.value++}(p,a,g[e]),_=g[e],(M=v[e])[0]=R(_[0]),M[1]=R(_[1]),M[2]=R(_[5]),M[3]=R(_[6]),M[4]=R(_[14]),M[5]=R(_[15]),M[6]=R(_[27]),M[7]=R(_[28]),M[8]=R(_[2]),M[9]=R(_[4]),M[10]=R(_[7]),M[11]=R(_[13]),M[12]=R(_[16]),M[13]=R(_[26]),M[14]=R(_[29]),M[15]=R(_[42]),M[16]=R(_[3]),M[17]=R(_[8]),M[18]=R(_[12]),M[19]=R(_[17]),M[20]=R(_[25]),M[21]=R(_[30]),M[22]=R(_[41]),M[23]=R(_[43]),M[24]=R(_[9]),M[25]=R(_[11]),M[26]=R(_[18]),M[27]=R(_[24]),M[28]=R(_[31]),M[29]=R(_[40]),M[30]=R(_[44]),M[31]=R(_[53]),M[32]=R(_[10]),M[33]=R(_[19]),M[34]=R(_[23]),M[35]=R(_[32]),M[36]=R(_[39]),M[37]=R(_[45]),M[38]=R(_[52]),M[39]=R(_[54]),M[40]=R(_[20]),M[41]=R(_[22]),M[42]=R(_[33]),M[43]=R(_[38]),M[44]=R(_[46]),M[45]=R(_[51]),M[46]=R(_[55]),M[47]=R(_[60]),M[48]=R(_[21]),M[49]=R(_[34]),M[50]=R(_[37]),M[51]=R(_[47]),M[52]=R(_[50]),M[53]=R(_[56]),M[54]=R(_[59]),M[55]=R(_[61]),M[56]=R(_[35]),M[57]=R(_[36]),M[58]=R(_[48]),M[59]=R(_[49]),M[60]=R(_[57]),M[61]=R(_[58]),M[62]=R(_[62]),M[63]=R(_[63]),function(e){let t=.5*Math.cos(3.14159/16),r=.5*Math.cos(3.14159/8),a=.5*Math.cos(3*3.14159/16),n=.5*Math.cos(3*3.14159/8);for(var i=[,,,,],o=[,,,,],s=[,,,,],l=[,,,,],c=0;c<8;++c){var u=8*c;i[0]=r*e[u+2],i[1]=n*e[u+2],i[2]=r*e[u+6],i[3]=n*e[u+6],o[0]=t*e[u+1]+a*e[u+3]+.2777854612564676*e[u+5]+.09754573032714427*e[u+7],o[1]=a*e[u+1]-.09754573032714427*e[u+3]-t*e[u+5]-.2777854612564676*e[u+7],o[2]=.2777854612564676*e[u+1]-t*e[u+3]+.09754573032714427*e[u+5]+a*e[u+7],o[3]=.09754573032714427*e[u+1]-.2777854612564676*e[u+3]+a*e[u+5]-t*e[u+7],s[0]=.35355362513961314*(e[u+0]+e[u+4]),s[3]=.35355362513961314*(e[u+0]-e[u+4]),s[1]=i[0]+i[3],s[2]=i[1]-i[2],l[0]=s[0]+s[1],l[1]=s[3]+s[2],l[2]=s[3]-s[2],l[3]=s[0]-s[1],e[u+0]=l[0]+o[0],e[u+1]=l[1]+o[1],e[u+2]=l[2]+o[2],e[u+3]=l[3]+o[3],e[u+4]=l[3]-o[3],e[u+5]=l[2]-o[2],e[u+6]=l[1]-o[1],e[u+7]=l[0]-o[0]}for(var f=0;f<8;++f)i[0]=r*e[16+f],i[1]=n*e[16+f],i[2]=r*e[48+f],i[3]=n*e[48+f],o[0]=t*e[8+f]+a*e[24+f]+.2777854612564676*e[40+f]+.09754573032714427*e[56+f],o[1]=a*e[8+f]-.09754573032714427*e[24+f]-t*e[40+f]-.2777854612564676*e[56+f],o[2]=.2777854612564676*e[8+f]-t*e[24+f]+.09754573032714427*e[40+f]+a*e[56+f],o[3]=.09754573032714427*e[8+f]-.2777854612564676*e[24+f]+a*e[40+f]-t*e[56+f],s[0]=.35355362513961314*(e[f]+e[32+f]),s[3]=.35355362513961314*(e[f]-e[32+f]),s[1]=i[0]+i[3],s[2]=i[1]-i[2],l[0]=s[0]+s[1],l[1]=s[3]+s[2],l[2]=s[3]-s[2],l[3]=s[0]-s[1],e[0+f]=l[0]+o[0],e[8+f]=l[1]+o[1],e[16+f]=l[2]+o[2],e[24+f]=l[3]+o[3],e[32+f]=l[3]-o[3],e[40+f]=l[2]-o[2],e[48+f]=l[1]-o[1],e[56+f]=l[0]-o[0]}(v[e])}for(var b=v,A=0;A<64;++A){var E=b[0][A],T=b[1][A],I=b[2][A];b[0][A]=E+1.5747*I,b[1][A]=E-.1873*T-.4682*I,b[2][A]=E+1.8556*T}for(let t=0;t<3;++t)!function(e,t,r){for(var a,n=0;n<64;++n){t[r+n]=V.DataUtils.toHalfFloat((a=e[n])<=1?Math.sign(a)*Math.pow(Math.abs(a),2.2):Math.sign(a)*Math.pow(9.025013291561939,Math.abs(a)-1))}}(v[t],y[t],64*e)}let i=0;for(let a=0;a<3;++a){let n=r[e.idx[a]].type;for(let e=8*t;e<8*t+x;++e){i=w[a][e];for(let t=0;t<c;++t){let r=64*t+(7&e)*8;o.setUint16(i+0*n,y[a][r+0],!0),o.setUint16(i+2*n,y[a][r+1],!0),o.setUint16(i+4*n,y[a][r+2],!0),o.setUint16(i+6*n,y[a][r+3],!0),o.setUint16(i+8*n,y[a][r+4],!0),o.setUint16(i+10*n,y[a][r+5],!0),o.setUint16(i+12*n,y[a][r+6],!0),o.setUint16(i+14*n,y[a][r+7],!0),i+=16*n}}if(c!=u)for(let e=8*t;e<8*t+x;++e){let t=w[a][e]+8*c*2*n,r=64*c+(7&e)*8;for(let e=0;e<S;++e)o.setUint16(t+2*e*n,y[a][r+e],!0)}}}for(var C=new Uint16Array(s),o=new DataView(i.buffer),F=0;F<3;++F){r[e.idx[F]].decoded=!0;var P=r[e.idx[F]].type;if(2==r[F].type)for(var z=0;z<l;++z){let e=w[F][z];for(var O=0;O<s;++O)C[O]=o.getUint16(e+2*O*P,!0);for(var O=0;O<s;++O)o.setFloat32(e+2*O*P,R(C[O]),!0)}}}(_,O,p,b,C,a);for(var v=0;v<p.length;++v){var g=p[v];if(!g.decoded)if(2===g.compression)for(var k=0,H=0,L=0;L<e.lines;++L){for(var B=O[v][k],N=0;N<g.width;++N){for(var j=0;j<2*g.type;++j)a[B++]=P[H+j*g.width*g.height];H++}k++}else throw"EXRLoader.parse: unsupported channel compression"}return new DataView(a.buffer)}function x(e,t){for(var r=new Uint8Array(e),a=0;0!=r[t.value+a];)a+=1;var n=new TextDecoder().decode(r.slice(t.value,t.value+a));return t.value=t.value+a+1,n}function S(e,t){var r=e.getInt32(t.value,!0);return t.value=t.value+4,r}function b(e,t){var r=e.getUint32(t.value,!0);return t.value=t.value+4,r}function A(e,t){var r=e[t.value];return t.value=t.value+1,r}function E(e,t){var r=e.getUint8(t.value);return t.value=t.value+1,r}let T=function(e,t){let r;return r="getBigInt64"in DataView.prototype?Number(e.getBigInt64(t.value,!0)):e.getUint32(t.value+4,!0)+Number(e.getUint32(t.value,!0)<<32),t.value+=8,r};function I(e,t){var r=e.getFloat32(t.value,!0);return t.value+=4,r}function C(e,t){return V.DataUtils.toHalfFloat(I(e,t))}function R(e){var t=(31744&e)>>10,r=1023&e;return(e>>15?-1:1)*(t?31===t?r?NaN:1/0:Math.pow(2,t-15)*(1+r/1024):r/1024*6103515625e-14)}function F(e,t){var r=e.getUint16(t.value,!0);return t.value+=2,r}function P(e,t){return R(F(e,t))}let z=new DataView(e),O=new Uint8Array(e),L={value:0},U=function(e,t,r){let a={};if(0x1312f76!=e.getUint32(0,!0))throw"THREE.EXRLoader: provided file doesn't appear to be in OpenEXR format.";a.version=e.getUint8(4);let n=e.getUint8(5);a.spec={singleTile:!!(2&n),longName:!!(4&n),deepFormat:!!(8&n),multiPart:!!(16&n)},r.value=8;for(var i=!0;i;){var o=x(t,r);if(0==o)i=!1;else{var s=x(t,r),l=b(e,r),c=function(e,t,r,a,n){var i,o,s,l,c,u,f;if("string"===a||"stringvector"===a||"iccProfile"===a)return i=new TextDecoder().decode(new Uint8Array(t).slice(r.value,r.value+n)),r.value=r.value+n,i;if("chlist"===a)return function(e,t,r,a){for(var n=r.value,i=[];r.value<n+a-1;){var o=x(t,r),s=S(e,r),l=E(e,r);r.value+=3;var c=S(e,r),u=S(e,r);i.push({name:o,pixelType:s,pLinear:l,xSampling:c,ySampling:u})}return r.value+=1,i}(e,t,r,n);if("chromaticities"===a)return o=I(e,r),s=I(e,r),l=I(e,r),c=I(e,r),u=I(e,r),{redX:o,redY:s,greenX:l,greenY:c,blueX:u,blueY:I(e,r),whiteX:I(e,r),whiteY:I(e,r)};if("compression"===a)return["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"][E(e,r)];if("box2i"===a)return f=b(e,r),{xMin:f,yMin:b(e,r),xMax:b(e,r),yMax:b(e,r)};else if("lineOrder"===a)return["INCREASING_Y"][E(e,r)];else if("float"===a)return I(e,r);else if("v2f"===a)return[I(e,r),I(e,r)];else if("v3f"===a)return[I(e,r),I(e,r),I(e,r)];else if("int"===a)return S(e,r);else if("rational"===a)return[S(e,r),b(e,r)];else if("timecode"===a)return[b(e,r),b(e,r)];else return"preview"===a?(r.value+=n,"skipped"):(r.value+=n,void 0)}(e,t,r,s,l);void 0===c?console.warn(`EXRLoader.parse: skipped unknown header attribute type '${s}'.`):a[o]=c}}if((-5&n)!=0)throw console.error("EXRHeader:",a),"THREE.EXRLoader: provided file is currently unsupported.";return a}(z,e,L),D=function(e,t,r,a,n){let i={size:0,viewer:t,array:r,offset:a,width:e.dataWindow.xMax-e.dataWindow.xMin+1,height:e.dataWindow.yMax-e.dataWindow.yMin+1,channels:e.channels.length,bytesPerLine:null,lines:null,inputSize:null,type:e.channels[0].pixelType,uncompress:null,getter:null,format:null,[tT?"colorSpace":"encoding"]:null};switch(e.compression){case"NO_COMPRESSION":i.lines=1,i.uncompress=v;break;case"RLE_COMPRESSION":i.lines=1,i.uncompress=g;break;case"ZIPS_COMPRESSION":i.lines=1,i.uncompress=y;break;case"ZIP_COMPRESSION":i.lines=16,i.uncompress=y;break;case"PIZ_COMPRESSION":i.lines=32,i.uncompress=w;break;case"PXR24_COMPRESSION":i.lines=16,i.uncompress=_;break;case"DWAA_COMPRESSION":i.lines=32,i.uncompress=M;break;case"DWAB_COMPRESSION":i.lines=256,i.uncompress=M;break;default:throw"EXRLoader.parse: "+e.compression+" is unsupported"}if(i.scanlineBlockSize=i.lines,1==i.type)switch(n){case V.FloatType:i.getter=P,i.inputSize=2;break;case V.HalfFloatType:i.getter=F,i.inputSize=2}else if(2==i.type)switch(n){case V.FloatType:i.getter=I,i.inputSize=4;break;case V.HalfFloatType:i.getter=C,i.inputSize=4}else throw"EXRLoader.parse: unsupported pixelType "+i.type+" for "+e.compression+".";i.blockCount=(e.dataWindow.yMax+1)/i.scanlineBlockSize;for(var o=0;o<i.blockCount;o++)T(t,a);i.outputChannels=3==i.channels?4:i.channels;let s=i.width*i.height*i.outputChannels;switch(n){case V.FloatType:i.byteArray=new Float32Array(s),i.channels<i.outputChannels&&i.byteArray.fill(1,0,s);break;case V.HalfFloatType:i.byteArray=new Uint16Array(s),i.channels<i.outputChannels&&i.byteArray.fill(15360,0,s);break;default:console.error("THREE.EXRLoader: unsupported type: ",n)}return i.bytesPerLine=i.width*i.inputSize*i.channels,4==i.outputChannels?i.format=V.RGBAFormat:i.format=V.RedFormat,tT?i.colorSpace="srgb-linear":i.encoding=3e3,i}(U,z,O,L,this.type),k={value:0},H={R:0,G:1,B:2,A:3,Y:0};for(let e=0;e<D.height/D.scanlineBlockSize;e++){let t=b(z,L);D.size=b(z,L),D.lines=t+D.scanlineBlockSize>D.height?D.height-t:D.scanlineBlockSize;let r=D.size<D.lines*D.bytesPerLine?D.uncompress(D):v(D);L.value+=D.size;for(let t=0;t<D.scanlineBlockSize;t++){let a=t+e*D.scanlineBlockSize;if(a>=D.height)break;for(let e=0;e<D.channels;e++){let n=H[U.channels[e].name];for(let i=0;i<D.width;i++){k.value=(t*(D.channels*D.width)+e*D.width+i)*D.inputSize;let o=(D.height-1-a)*(D.width*D.outputChannels)+i*D.outputChannels+n;D.byteArray[o]=D.getter(r,k)}}}}return{header:U,width:D.width,height:D.height,data:D.byteArray,format:D.format,[tT?"colorSpace":"encoding"]:D[tT?"colorSpace":"encoding"],type:this.type}}setDataType(e){return this.type=e,this}load(e,t,r,a){return super.load(e,function(e,r){tT?e.colorSpace=r.colorSpace:e.encoding=r.encoding,e.minFilter=V.LinearFilter,e.magFilter=V.LinearFilter,e.generateMipmaps=!1,e.flipY=!1,t&&t(e,r)},r,a)}}var tC=e.i(861);let tR=(e,t,r)=>{let a;switch(e){case P.UnsignedByteType:a=new Uint8ClampedArray(t*r*4);break;case P.HalfFloatType:a=new Uint16Array(t*r*4);break;case P.UnsignedIntType:a=new Uint32Array(t*r*4);break;case P.ByteType:a=new Int8Array(t*r*4);break;case P.ShortType:a=new Int16Array(t*r*4);break;case P.IntType:a=new Int32Array(t*r*4);break;case P.FloatType:a=new Float32Array(t*r*4);break;default:throw Error("Unsupported data type")}return a};class tF{_renderer;_rendererIsDisposable=!1;_material;_scene;_camera;_quad;_renderTarget;_width;_height;_type;_colorSpace;_supportsReadPixels=!0;constructor(e){this._width=e.width,this._height=e.height,this._type=e.type,this._colorSpace=e.colorSpace;const r={format:P.RGBAFormat,depthBuffer:!1,stencilBuffer:!1,type:this._type,colorSpace:this._colorSpace,anisotropy:e.renderTargetOptions?.anisotropy!==void 0?e.renderTargetOptions?.anisotropy:1,generateMipmaps:e.renderTargetOptions?.generateMipmaps!==void 0&&e.renderTargetOptions?.generateMipmaps,magFilter:e.renderTargetOptions?.magFilter!==void 0?e.renderTargetOptions?.magFilter:P.LinearFilter,minFilter:e.renderTargetOptions?.minFilter!==void 0?e.renderTargetOptions?.minFilter:P.LinearFilter,samples:e.renderTargetOptions?.samples!==void 0?e.renderTargetOptions?.samples:void 0,wrapS:e.renderTargetOptions?.wrapS!==void 0?e.renderTargetOptions?.wrapS:P.ClampToEdgeWrapping,wrapT:e.renderTargetOptions?.wrapT!==void 0?e.renderTargetOptions?.wrapT:P.ClampToEdgeWrapping};if(this._material=e.material,e.renderer?this._renderer=e.renderer:(this._renderer=tF.instantiateRenderer(),this._rendererIsDisposable=!0),this._scene=new P.Scene,this._camera=new P.OrthographicCamera,this._camera.position.set(0,0,10),this._camera.left=-.5,this._camera.right=.5,this._camera.top=.5,this._camera.bottom=-.5,this._camera.updateProjectionMatrix(),!((e,r,a,n)=>{if(void 0!==t)return t;let i=new P.WebGLRenderTarget(1,1,n);r.setRenderTarget(i);let o=new P.Mesh(new P.PlaneGeometry,new P.MeshBasicMaterial({color:0xffffff}));r.render(o,a),r.setRenderTarget(null);let s=tR(e,i.width,i.height);return r.readRenderTargetPixels(i,0,0,i.width,i.height,s),i.dispose(),o.geometry.dispose(),o.material.dispose(),t=0!==s[0]})(this._type,this._renderer,this._camera,r)){let e;this._type===P.HalfFloatType&&(e=this._renderer.extensions.has("EXT_color_buffer_float")?P.FloatType:void 0),void 0!==e?(console.warn(`This browser does not support reading pixels from ${this._type} RenderTargets, switching to ${P.FloatType}`),this._type=e):(this._supportsReadPixels=!1,console.warn("This browser dos not support toArray or toDataTexture, calls to those methods will result in an error thrown"))}this._quad=new P.Mesh(new P.PlaneGeometry,this._material),this._quad.geometry.computeBoundingBox(),this._scene.add(this._quad),this._renderTarget=new P.WebGLRenderTarget(this.width,this.height,r),this._renderTarget.texture.mapping=e.renderTargetOptions?.mapping!==void 0?e.renderTargetOptions?.mapping:P.UVMapping}static instantiateRenderer(){let e=new tC.WebGLRenderer;return e.setSize(128,128),e}render=()=>{this._renderer.setRenderTarget(this._renderTarget);try{this._renderer.render(this._scene,this._camera)}catch(e){throw this._renderer.setRenderTarget(null),e}this._renderer.setRenderTarget(null)};toArray(){if(!this._supportsReadPixels)throw Error("Can't read pixels in this browser");let e=tR(this._type,this._width,this._height);return this._renderer.readRenderTargetPixels(this._renderTarget,0,0,this._width,this._height,e),e}toDataTexture(e){let t=new P.DataTexture(this.toArray(),this.width,this.height,P.RGBAFormat,this._type,e?.mapping||P.UVMapping,e?.wrapS||P.ClampToEdgeWrapping,e?.wrapT||P.ClampToEdgeWrapping,e?.magFilter||P.LinearFilter,e?.minFilter||P.LinearFilter,e?.anisotropy||1,P.LinearSRGBColorSpace);return t.generateMipmaps=e?.generateMipmaps!==void 0&&e?.generateMipmaps,t}disposeOnDemandRenderer(){this._renderer.setRenderTarget(null),this._rendererIsDisposable&&(this._renderer.dispose(),this._renderer.forceContextLoss())}dispose(e){this.disposeOnDemandRenderer(),e&&this.renderTarget.dispose(),this.material instanceof P.ShaderMaterial&&Object.values(this.material.uniforms).forEach(e=>{e.value instanceof P.Texture&&e.value.dispose()}),Object.values(this.material).forEach(e=>{e instanceof P.Texture&&e.dispose()}),this.material.dispose(),this._quad.geometry.dispose()}get width(){return this._width}set width(e){this._width=e,this._renderTarget.setSize(this._width,this._height)}get height(){return this._height}set height(e){this._height=e,this._renderTarget.setSize(this._width,this._height)}get renderer(){return this._renderer}get renderTarget(){return this._renderTarget}set renderTarget(e){this._renderTarget=e,this._width=e.width,this._height=e.height}get material(){return this._material}get type(){return this._type}get colorSpace(){return this._colorSpace}}var tP=P;class tz extends Error{}class tO extends Error{}let tL=(e,t,r)=>{let a=RegExp(`${t}="([^"]*)"`,"i").exec(e);if(a)return a[1];let n=RegExp(`<${t}[^>]*>([\\s\\S]*?)</${t}>`,"i").exec(e);if(n){let e=n[1].match(/<rdf:li>([^<]*)<\/rdf:li>/g);return e&&3===e.length?e.map(e=>e.replace(/<\/?rdf:li>/g,"")):n[1].trim()}if(void 0!==r)return r;throw Error(`Can't find ${t} in gainmap metadata`)};class tU{options;constructor(e){this.options={debug:!!e&&void 0!==e.debug&&e.debug,extractFII:!e||void 0===e.extractFII||e.extractFII,extractNonFII:!e||void 0===e.extractNonFII||e.extractNonFII}}extract(e){return new Promise((t,r)=>{let a,n=this.options.debug,i=new DataView(e.buffer);if(65496!==i.getUint16(0))return void r(Error("Not a valid jpeg"));let o=i.byteLength,s=2,l=0;for(;s<o;){if(++l>250)return void r(Error(`Found no marker after ${l} loops 😵`));if(255!==i.getUint8(s))return void r(Error(`Not a valid marker at offset 0x${s.toString(16)}, found: 0x${i.getUint8(s).toString(16)}`));if(a=i.getUint8(s+1),n&&console.log(`Marker: ${a.toString(16)}`),226===a){n&&console.log("Found APP2 marker (0xffe2)");let e=s+4;if(0x4d504600===i.getUint32(e)){let a,n=e+4;if(18761===i.getUint16(n))a=!1;else{if(19789!==i.getUint16(n))return void r(Error("No valid endianness marker found in TIFF header"));a=!0}if(42!==i.getUint16(n+2,!a))return void r(Error("Not valid TIFF data! (no 0x002A marker)"));let o=i.getUint32(n+4,!a);if(o<8)return void r(Error("Not valid TIFF data! (First offset less than 8)"));let s=n+o,l=i.getUint16(s,!a),c=s+2,u=0;for(let e=c;e<c+12*l;e+=12)45057===i.getUint16(e,!a)&&(u=i.getUint32(e+8,!a));let f=s+2+12*l+4,h=[];for(let e=f;e<f+16*u;e+=16){let t={MPType:i.getUint32(e,!a),size:i.getUint32(e+4,!a),dataOffset:i.getUint32(e+8,!a),dependantImages:i.getUint32(e+12,!a),start:-1,end:-1,isFII:!1};t.dataOffset?(t.start=n+t.dataOffset,t.isFII=!1):(t.start=0,t.isFII=!0),t.end=t.start+t.size,h.push(t)}if(this.options.extractNonFII&&h.length){let e=new Blob([i]),r=[];for(let t of h){if(t.isFII&&!this.options.extractFII)continue;let a=e.slice(t.start,t.end+1,"image/jpeg");r.push(a)}t(r)}}}s+=2+i.getUint16(s+2)}})}}let tD=async e=>{let t=(e=>{let t,r=(t="u">typeof TextDecoder?new TextDecoder().decode(e):e.toString()).indexOf("<x:xmpmeta");for(;-1!==r;){let e=t.indexOf("x:xmpmeta>",r),a=t.slice(r,e+10);try{let e=tL(a,"hdrgm:GainMapMin","0"),t=tL(a,"hdrgm:GainMapMax"),r=tL(a,"hdrgm:Gamma","1"),n=tL(a,"hdrgm:OffsetSDR","0.015625"),i=tL(a,"hdrgm:OffsetHDR","0.015625"),o=/hdrgm:HDRCapacityMin="([^"]*)"/.exec(a),s=o?o[1]:"0",l=/hdrgm:HDRCapacityMax="([^"]*)"/.exec(a);if(!l)throw Error("Incomplete gainmap metadata");let c=l[1];return{gainMapMin:Array.isArray(e)?e.map(e=>parseFloat(e)):[parseFloat(e),parseFloat(e),parseFloat(e)],gainMapMax:Array.isArray(t)?t.map(e=>parseFloat(e)):[parseFloat(t),parseFloat(t),parseFloat(t)],gamma:Array.isArray(r)?r.map(e=>parseFloat(e)):[parseFloat(r),parseFloat(r),parseFloat(r)],offsetSdr:Array.isArray(n)?n.map(e=>parseFloat(e)):[parseFloat(n),parseFloat(n),parseFloat(n)],offsetHdr:Array.isArray(i)?i.map(e=>parseFloat(e)):[parseFloat(i),parseFloat(i),parseFloat(i)],hdrCapacityMin:parseFloat(s),hdrCapacityMax:parseFloat(c)}}catch(e){}r=t.indexOf("<x:xmpmeta",e)}})(e);if(!t)throw new tO("Gain map XMP metadata not found");let r=new tU({extractFII:!0,extractNonFII:!0}),a=await r.extract(e);if(2!==a.length)throw new tz("Gain map recovery image not found");return{sdr:new Uint8Array(await a[0].arrayBuffer()),gainMap:new Uint8Array(await a[1].arrayBuffer()),metadata:t}},tk=e=>new Promise((t,r)=>{let a=document.createElement("img");a.onload=()=>{t(a)},a.onerror=e=>{r(e)},a.src=URL.createObjectURL(e)});class tH extends tP.Loader{_renderer;_renderTargetOptions;_internalLoadingManager;_config;constructor(e,t){super(t),this._config=e,e.renderer&&(this._renderer=e.renderer),this._internalLoadingManager=new tP.LoadingManager}setRenderer(e){return this._renderer=e,this}setRenderTargetOptions(e){return this._renderTargetOptions=e,this}prepareQuadRenderer(){this._renderer||console.warn("WARNING: A Renderer was not passed to this Loader constructor or in setRenderer, the result of this Loader will need to be converted to a Data Texture with toDataTexture() before you can use it in your renderer.");let e=this._config.createMaterial({gainMapMax:[1,1,1],gainMapMin:[0,0,0],gamma:[1,1,1],offsetHdr:[1,1,1],offsetSdr:[1,1,1],hdrCapacityMax:1,hdrCapacityMin:0,maxDisplayBoost:1,gainMap:new tP.Texture,sdr:new tP.Texture});return this._config.createQuadRenderer({width:16,height:16,type:tP.HalfFloatType,colorSpace:tP.LinearSRGBColorSpace,material:e,renderer:this._renderer,renderTargetOptions:this._renderTargetOptions})}async processImages(e,t,r){let a,n,i=t?new Blob([t],{type:"image/jpeg"}):void 0,o=new Blob([e],{type:"image/jpeg"}),s=!1;if("u"<typeof createImageBitmap){let e=await Promise.all([i?tk(i):Promise.resolve(void 0),tk(o)]);n=e[0],a=e[1],s="flipY"===r}else{let e=await Promise.all([i?createImageBitmap(i,{imageOrientation:r||"flipY"}):Promise.resolve(void 0),createImageBitmap(o,{imageOrientation:r||"flipY"})]);n=e[0],a=e[1]}return{sdrImage:a,gainMapImage:n,needsFlip:s}}createTextures(e,t,r){let a=new tP.Texture(t||new ImageData(2,2),tP.UVMapping,tP.ClampToEdgeWrapping,tP.ClampToEdgeWrapping,tP.LinearFilter,tP.LinearMipMapLinearFilter,tP.RGBAFormat,tP.UnsignedByteType,1,tP.LinearSRGBColorSpace);a.flipY=r,a.needsUpdate=!0;let n=new tP.Texture(e,tP.UVMapping,tP.ClampToEdgeWrapping,tP.ClampToEdgeWrapping,tP.LinearFilter,tP.LinearMipMapLinearFilter,tP.RGBAFormat,tP.UnsignedByteType,1,tP.SRGBColorSpace);return n.flipY=r,n.needsUpdate=!0,{gainMap:a,sdr:n}}updateQuadRenderer(e,t,r,a,n){e.width=t.width,e.height=t.height,e.material.gainMap=r,e.material.sdr=a,e.material.gainMapMin=n.gainMapMin,e.material.gainMapMax=n.gainMapMax,e.material.offsetHdr=n.offsetHdr,e.material.offsetSdr=n.offsetSdr,e.material.gamma=n.gamma,e.material.hdrCapacityMin=n.hdrCapacityMin,e.material.hdrCapacityMax=n.hdrCapacityMax,e.material.maxDisplayBoost=Math.pow(2,n.hdrCapacityMax),e.material.needsUpdate=!0}}var tB=P;let tN=`
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,tj=`
// min half float value
#define HALF_FLOAT_MIN vec3( -65504, -65504, -65504 )
// max half float value
#define HALF_FLOAT_MAX vec3( 65504, 65504, 65504 )

uniform sampler2D sdr;
uniform sampler2D gainMap;
uniform vec3 gamma;
uniform vec3 offsetHdr;
uniform vec3 offsetSdr;
uniform vec3 gainMapMin;
uniform vec3 gainMapMax;
uniform float weightFactor;

varying vec2 vUv;

void main() {
  vec3 rgb = texture2D( sdr, vUv ).rgb;
  vec3 recovery = texture2D( gainMap, vUv ).rgb;
  vec3 logRecovery = pow( recovery, gamma );
  vec3 logBoost = gainMapMin * ( 1.0 - logRecovery ) + gainMapMax * logRecovery;
  vec3 hdrColor = (rgb + offsetSdr) * exp2( logBoost * weightFactor ) - offsetHdr;
  vec3 clampedHdrColor = max( HALF_FLOAT_MIN, min( HALF_FLOAT_MAX, hdrColor ));
  gl_FragColor = vec4( clampedHdrColor , 1.0 );
}
`;class t$ extends tB.ShaderMaterial{_maxDisplayBoost;_hdrCapacityMin;_hdrCapacityMax;constructor({gamma:e,offsetHdr:t,offsetSdr:r,gainMapMin:a,gainMapMax:n,maxDisplayBoost:i,hdrCapacityMin:o,hdrCapacityMax:s,sdr:l,gainMap:c}){super({name:"GainMapDecoderMaterial",vertexShader:tN,fragmentShader:tj,uniforms:{sdr:{value:l},gainMap:{value:c},gamma:{value:new tB.Vector3(1/e[0],1/e[1],1/e[2])},offsetHdr:{value:new tB.Vector3().fromArray(t)},offsetSdr:{value:new tB.Vector3().fromArray(r)},gainMapMin:{value:new tB.Vector3().fromArray(a)},gainMapMax:{value:new tB.Vector3().fromArray(n)},weightFactor:{value:(Math.log2(i)-o)/(s-o)}},blending:tB.NoBlending,depthTest:!1,depthWrite:!1}),this._maxDisplayBoost=i,this._hdrCapacityMin=o,this._hdrCapacityMax=s,this.needsUpdate=!0,this.uniformsNeedUpdate=!0}get sdr(){return this.uniforms.sdr.value}set sdr(e){this.uniforms.sdr.value=e}get gainMap(){return this.uniforms.gainMap.value}set gainMap(e){this.uniforms.gainMap.value=e}get offsetHdr(){return this.uniforms.offsetHdr.value.toArray()}set offsetHdr(e){this.uniforms.offsetHdr.value.fromArray(e)}get offsetSdr(){return this.uniforms.offsetSdr.value.toArray()}set offsetSdr(e){this.uniforms.offsetSdr.value.fromArray(e)}get gainMapMin(){return this.uniforms.gainMapMin.value.toArray()}set gainMapMin(e){this.uniforms.gainMapMin.value.fromArray(e)}get gainMapMax(){return this.uniforms.gainMapMax.value.toArray()}set gainMapMax(e){this.uniforms.gainMapMax.value.fromArray(e)}get gamma(){let e=this.uniforms.gamma.value;return[1/e.x,1/e.y,1/e.z]}set gamma(e){let t=this.uniforms.gamma.value;t.x=1/e[0],t.y=1/e[1],t.z=1/e[2]}get hdrCapacityMin(){return this._hdrCapacityMin}set hdrCapacityMin(e){this._hdrCapacityMin=e,this.calculateWeight()}get hdrCapacityMax(){return this._hdrCapacityMax}set hdrCapacityMax(e){this._hdrCapacityMax=e,this.calculateWeight()}get maxDisplayBoost(){return this._maxDisplayBoost}set maxDisplayBoost(e){this._maxDisplayBoost=Math.max(1,Math.min(65504,e)),this.calculateWeight()}calculateWeight(){let e=(Math.log2(this._maxDisplayBoost)-this._hdrCapacityMin)/(this._hdrCapacityMax-this._hdrCapacityMin);this.uniforms.weightFactor.value=Math.max(0,Math.min(1,e))}}tC.WebGLRenderer;class tV extends tH{constructor(e,t){super({renderer:e,createMaterial:e=>new t$(e),createQuadRenderer:e=>new tF(e)},t)}async render(e,t,r,a){let{sdrImage:n,gainMapImage:i,needsFlip:o}=await this.processImages(r,a,"flipY"),{gainMap:s,sdr:l}=this.createTextures(n,i,o);this.updateQuadRenderer(e,n,s,l,t),e.render()}}class tG extends tV{load([e,t,r],a,n,i){let o,s,l,c=this.prepareQuadRenderer(),u=async()=>{if(o&&s&&l){try{await this.render(c,l,o,s)}catch(a){this.manager.itemError(e),this.manager.itemError(t),this.manager.itemError(r),"function"==typeof i&&i(a),c.disposeOnDemandRenderer();return}"function"==typeof a&&a(c),this.manager.itemEnd(e),this.manager.itemEnd(t),this.manager.itemEnd(r),c.disposeOnDemandRenderer()}},f=!0,h=0,d=0,p=!0,m=0,v=0,g=!0,y=0,w=0,_=()=>{"function"==typeof n&&n(new ProgressEvent("progress",{lengthComputable:f&&p&&g,loaded:d+v+w,total:h+m+y}))};this.manager.itemStart(e),this.manager.itemStart(t),this.manager.itemStart(r);let M=new tB.FileLoader(this._internalLoadingManager);M.setResponseType("arraybuffer"),M.setRequestHeader(this.requestHeader),M.setPath(this.path),M.setWithCredentials(this.withCredentials),M.load(e,async e=>{if("string"==typeof e)throw Error("Invalid sdr buffer");o=e,await u()},e=>{f=e.lengthComputable,d=e.loaded,h=e.total,_()},t=>{this.manager.itemError(e),"function"==typeof i&&i(t)});let x=new tB.FileLoader(this._internalLoadingManager);x.setResponseType("arraybuffer"),x.setRequestHeader(this.requestHeader),x.setPath(this.path),x.setWithCredentials(this.withCredentials),x.load(t,async e=>{if("string"==typeof e)throw Error("Invalid gainmap buffer");s=e,await u()},e=>{p=e.lengthComputable,v=e.loaded,m=e.total,_()},e=>{this.manager.itemError(t),"function"==typeof i&&i(e)});let S=new tB.FileLoader(this._internalLoadingManager);return S.setRequestHeader(this.requestHeader),S.setPath(this.path),S.setWithCredentials(this.withCredentials),S.load(r,async e=>{if("string"!=typeof e)throw Error("Invalid metadata string");l=JSON.parse(e),await u()},e=>{g=e.lengthComputable,w=e.loaded,y=e.total,_()},e=>{this.manager.itemError(r),"function"==typeof i&&i(e)}),c}}class tW extends tV{load(e,t,r,a){let n=this.prepareQuadRenderer(),i=new tB.FileLoader(this._internalLoadingManager);return i.setResponseType("arraybuffer"),i.setRequestHeader(this.requestHeader),i.setPath(this.path),i.setWithCredentials(this.withCredentials),this.manager.itemStart(e),i.load(e,async r=>{let i,o,s;if("string"==typeof r)throw Error("Invalid buffer, received [string], was expecting [ArrayBuffer]");let l=new Uint8Array(r);try{let e=await tD(l);i=e.sdr,o=e.gainMap,s=e.metadata}catch(t){if(t instanceof tO||t instanceof tz)console.warn(`Failure to reconstruct an HDR image from ${e}: Gain map metadata not found in the file, HDRJPGLoader will render the SDR jpeg`),s={gainMapMin:[0,0,0],gainMapMax:[1,1,1],gamma:[1,1,1],hdrCapacityMin:0,hdrCapacityMax:1,offsetHdr:[0,0,0],offsetSdr:[0,0,0]},i=l;else throw t}try{await this.render(n,s,i.buffer,o?.buffer)}catch(t){this.manager.itemError(e),"function"==typeof a&&a(t),n.disposeOnDemandRenderer();return}"function"==typeof t&&t(n),this.manager.itemEnd(e),n.disposeOnDemandRenderer()},r,t=>{this.manager.itemError(e),"function"==typeof a&&a(t)}),n}}let tq={apartment:"lebombo_1k.hdr",city:"potsdamer_platz_1k.hdr",dawn:"kiara_1_dawn_1k.hdr",forest:"forest_slope_1k.hdr",lobby:"st_fagans_interior_1k.hdr",night:"dikhololo_night_1k.hdr",park:"rooitou_park_1k.hdr",studio:"studio_small_03_1k.hdr",sunset:"venice_sunset_1k.hdr",warehouse:"empty_warehouse_01_1k.hdr"},tX="https://raw.githack.com/pmndrs/drei-assets/456060a26bbeb8fdf79326f224b6d99b8bcce736/hdri/",tY=["/px.png","/nx.png","/py.png","/ny.png","/pz.png","/nz.png"];function tZ({files:e=tY,path:t="",preset:r,colorSpace:a,extensions:n}={}){r&&(tJ(r),e=tq[r],t=tX);let i=Array.isArray(e),{extension:o,isCubemap:s}=t0(e),l=t1(o);if(!l)throw Error("useEnvironment: Unrecognized file extension: "+e);let c=(0,z.useThree)(e=>e.gl);(0,I.useLayoutEffect)(()=>{("webp"===o||"jpg"===o||"jpeg"===o)&&c.domElement.addEventListener("webglcontextlost",function(){N.G.clear(l,i?[e]:e)},{once:!0})},[e,c.domElement]);let u=(0,N.G)(l,i?[e]:e,e=>{("webp"===o||"jpg"===o||"jpeg"===o)&&e.setRenderer(c),null==e.setPath||e.setPath(t),n&&n(e)}),f=i?u[0]:u;if("jpg"===o||"jpeg"===o||"webp"===o){var h;f=null==(h=f.renderTarget)?void 0:h.texture}return f.mapping=s?P.CubeReflectionMapping:P.EquirectangularReflectionMapping,f.colorSpace=null!=a?a:s?"srgb":"srgb-linear",f}let tK={files:tY,path:"",preset:void 0,extensions:void 0};tZ.preload=e=>{let t={...tK,...e},{files:r,path:a=""}=t,{preset:n,extensions:i}=t;n&&(tJ(n),r=tq[n],a=tX);let{extension:o}=t0(r);if("webp"===o||"jpg"===o||"jpeg"===o)throw Error("useEnvironment: Preloading gainmaps is not supported");let s=t1(o);if(!s)throw Error("useEnvironment: Unrecognized file extension: "+r);N.G.preload(s,Array.isArray(r)?[r]:r,e=>{null==e.setPath||e.setPath(a),i&&i(e)})};let tQ={files:tY,preset:void 0};function tJ(e){if(!(e in tq))throw Error("Preset must be one of: "+Object.keys(tq).join(", "))}function t0(e){var t;let r=Array.isArray(e)&&6===e.length,a=Array.isArray(e)&&3===e.length&&e.some(e=>e.endsWith("json")),n=Array.isArray(e)?e[0]:e;return{extension:r?"cube":a?"webp":n.startsWith("data:application/exr")?"exr":n.startsWith("data:application/hdr")?"hdr":n.startsWith("data:image/jpeg")?"jpg":null==(t=n.split(".").pop())||null==(t=t.split("?"))||null==(t=t.shift())?void 0:t.toLowerCase(),isCubemap:r,isGainmap:a}}function t1(e){return"cube"===e?P.CubeTextureLoader:"hdr"===e?$:"exr"===e?tI:"jpg"===e||"jpeg"===e?tW:"webp"===e?tG:null}function t2(e,t,r,a,n={}){var i,o,s,l,c;let u;n={backgroundBlurriness:0,backgroundIntensity:1,backgroundRotation:[0,0,0],environmentIntensity:1,environmentRotation:[0,0,0],...n};let f=(u=c=t||r).current&&u.current.isScene?c.current:c,h=f.background,d=f.environment,p={backgroundBlurriness:f.backgroundBlurriness,backgroundIntensity:f.backgroundIntensity,backgroundRotation:null!=(i=null==(o=f.backgroundRotation)||null==o.clone?void 0:o.clone())?i:[0,0,0],environmentIntensity:f.environmentIntensity,environmentRotation:null!=(s=null==(l=f.environmentRotation)||null==l.clone?void 0:l.clone())?s:[0,0,0]};return"only"!==e&&(f.environment=a),e&&(f.background=a),(0,U.s)(f,n),()=>{"only"!==e&&(f.environment=d),e&&(f.background=h),(0,U.s)(f,p)}}function t3({scene:e,background:t=!1,map:r,...a}){let n=(0,z.useThree)(e=>e.scene);return I.useLayoutEffect(()=>{if(r)return t2(t,e,n,r,a)}),null}function t5({background:e=!1,scene:t,blur:r,backgroundBlurriness:a,backgroundIntensity:n,backgroundRotation:i,environmentIntensity:o,environmentRotation:s,...l}){let c=tZ(l),u=(0,z.useThree)(e=>e.scene);return I.useLayoutEffect(()=>t2(e,t,u,c,{backgroundBlurriness:null!=r?r:a,backgroundIntensity:n,backgroundRotation:i,environmentIntensity:o,environmentRotation:s})),I.useEffect(()=>()=>{c.dispose()},[c]),null}function t4({children:e,near:t=.1,far:r=1e3,resolution:a=256,frames:n=1,map:i,background:o=!1,blur:s,backgroundBlurriness:l,backgroundIntensity:c,backgroundRotation:u,environmentIntensity:f,environmentRotation:h,scene:d,files:p,path:m,preset:v,extensions:g}){let y=(0,z.useThree)(e=>e.gl),w=(0,z.useThree)(e=>e.scene),_=I.useRef(null),[M]=I.useState(()=>new P.Scene),x=I.useMemo(()=>{let e=new P.WebGLCubeRenderTarget(a);return e.texture.type=P.HalfFloatType,e},[a]);I.useEffect(()=>()=>{x.dispose()},[x]),I.useLayoutEffect(()=>{if(1===n){let e=y.autoClear;y.autoClear=!0,_.current.update(y,M),y.autoClear=e}return t2(o,d,w,x.texture,{backgroundBlurriness:null!=s?s:l,backgroundIntensity:c,backgroundRotation:u,environmentIntensity:f,environmentRotation:h})},[e,M,x.texture,d,w,o,n,y]);let S=1;return(0,R.useFrame)(()=>{if(n===1/0||S<n){let e=y.autoClear;y.autoClear=!0,_.current.update(y,M),y.autoClear=e,S++}}),I.createElement(I.Fragment,null,(0,L.createPortal)(I.createElement(I.Fragment,null,e,I.createElement("cubeCamera",{ref:_,args:[t,r,x]}),p||v?I.createElement(t5,{background:!0,files:p,preset:v,path:m,extensions:g}):i?I.createElement(t3,{background:!0,map:i,extensions:g}):null),M))}function t6(e){var t,r,a,n;let i=tZ(e),o=e.map||i;I.useMemo(()=>(0,D.e)({GroundProjectedEnvImpl:B}),[]),I.useEffect(()=>()=>{i.dispose()},[i]);let s=I.useMemo(()=>[o],[o]),l=null==(t=e.ground)?void 0:t.height,c=null==(r=e.ground)?void 0:r.radius,u=null!=(a=null==(n=e.ground)?void 0:n.scale)?a:1e3;return I.createElement(I.Fragment,null,I.createElement(t3,(0,O.default)({},e,{map:o})),I.createElement("groundProjectedEnvImpl",{args:s,scale:u,height:l,radius:c}))}function t8(e){return e.ground?I.createElement(t6,e):e.map?I.createElement(t3,e):e.children?I.createElement(t4,e):I.createElement(t5,e)}tZ.clear=e=>{let t={...tQ,...e},{files:r}=t,{preset:a}=t;a&&(tJ(a),r=tq[a]);let{extension:n}=t0(r),i=t1(n);if(!i)throw Error("useEnvironment: Unrecognized file extension: "+r);N.G.clear(i,Array.isArray(r)?[r]:r)};let t7=I.forwardRef(({envMap:e,resolution:t=256,frames:r=1/0,makeDefault:a,children:n,...i},o)=>{let s=(0,z.useThree)(({set:e})=>e),l=(0,z.useThree)(({camera:e})=>e),c=(0,z.useThree)(({size:e})=>e),u=I.useRef(null);I.useImperativeHandle(o,()=>u.current,[]);let f=I.useRef(null),h=function(e){let t=(0,z.useThree)(e=>e.size),r=(0,z.useThree)(e=>e.viewport),a="number"==typeof e?e:t.width*r.dpr,n=t.height*r.dpr,i=("number"==typeof e?void 0:e)||{},{samples:o=0,depth:s,...l}=i,c=null!=s?s:i.depthBuffer,u=I.useMemo(()=>{let e=new P.WebGLRenderTarget(a,n,{minFilter:P.LinearFilter,magFilter:P.LinearFilter,type:P.HalfFloatType,...l});return c&&(e.depthTexture=new P.DepthTexture(a,n,P.FloatType)),e.samples=o,e},[]);return I.useLayoutEffect(()=>{u.setSize(a,n),o&&(u.samples=o)},[o,u,a,n]),I.useEffect(()=>()=>u.dispose(),[]),u}(t);I.useLayoutEffect(()=>{i.manual||(u.current.aspect=c.width/c.height)},[c,i]),I.useLayoutEffect(()=>{u.current.updateProjectionMatrix()});let d=0,p=null,m="function"==typeof n;return(0,R.useFrame)(t=>{m&&(r===1/0||d<r)&&(f.current.visible=!1,t.gl.setRenderTarget(h),p=t.scene.background,e&&(t.scene.background=e),t.gl.render(t.scene,u.current),t.scene.background=p,t.gl.setRenderTarget(null),f.current.visible=!0,d++)}),I.useLayoutEffect(()=>{if(a)return s(()=>({camera:u.current})),()=>s(()=>({camera:l}))},[u,a,s]),I.createElement(I.Fragment,null,I.createElement("perspectiveCamera",(0,O.default)({ref:u},i),!m&&n),I.createElement("group",{ref:f},m&&n(h.texture)))});var N=U;let t9=e=>e===Object(e)&&!Array.isArray(e)&&"function"!=typeof e;function re(e,t){let r=(0,z.useThree)(e=>e.gl),a=(0,N.G)(P.TextureLoader,t9(e)?Object.values(e):e);return(0,I.useLayoutEffect)(()=>{null==t||t(a)},[t]),(0,I.useEffect)(()=>{if("initTexture"in r){let e=[];Array.isArray(a)?e=a:a instanceof P.Texture?e=[a]:t9(a)&&(e=Object.values(a)),e.forEach(e=>{e instanceof P.Texture&&r.initTexture(e)})}},[r,a]),(0,I.useMemo)(()=>{if(!t9(e))return a;{let t={},r=0;for(let n in e)t[n]=a[r++];return t}},[e,a])}re.preload=e=>N.G.preload(P.TextureLoader,e),re.clear=e=>N.G.clear(P.TextureLoader,e);var rt=P;let rr=`
    
#ifdef IS_VERTEX
    vec3 csm_Position;
    vec4 csm_PositionRaw;
    vec3 csm_Normal;

    // csm_PointSize
    #ifdef IS_POINTSMATERIAL
        float csm_PointSize;
    #endif
#else
    vec4 csm_DiffuseColor;
    vec4 csm_FragColor;
    float csm_UnlitFac;

    // csm_Emissive, csm_Roughness, csm_Metalness
    #if defined IS_MESHSTANDARDMATERIAL || defined IS_MESHPHYSICALMATERIAL
        vec3 csm_Emissive;
        float csm_Roughness;
        float csm_Metalness;
        float csm_Iridescence;
        
        #if defined IS_MESHPHYSICALMATERIAL
            float csm_Clearcoat;
            float csm_ClearcoatRoughness;
            vec3 csm_ClearcoatNormal;
            float csm_Transmission;
            float csm_Thickness;
        #endif
    #endif

    // csm_AO
    #if defined IS_MESHSTANDARDMATERIAL || defined IS_MESHPHYSICALMATERIAL || defined IS_MESHBASICMATERIAL || defined IS_MESHLAMBERTMATERIAL || defined IS_MESHPHONGMATERIAL || defined IS_MESHTOONMATERIAL
        float csm_AO;
    #endif

    // csm_FragNormal
    #if defined IS_MESHLAMBERTMATERIAL || defined IS_MESHMATCAPMATERIAL || defined IS_MESHNORMALMATERIAL || defined IS_MESHPHONGMATERIAL || defined IS_MESHPHYSICALMATERIAL || defined IS_MESHSTANDARDMATERIAL || defined IS_MESHTOONMATERIAL || defined IS_SHADOWMATERIAL 
        vec3 csm_FragNormal;
    #endif

    float csm_DepthAlpha;
#endif
`,ra=`

#ifdef IS_VERTEX
    // csm_Position & csm_PositionRaw
    #ifdef IS_UNKNOWN
        csm_Position = vec3(0.0);
        csm_PositionRaw = vec4(0.0);
        csm_Normal = vec3(0.0);
    #else
        csm_Position = position;
        csm_PositionRaw = projectionMatrix * modelViewMatrix * vec4(position, 1.);
        csm_Normal = normal;
    #endif

    // csm_PointSize
    #ifdef IS_POINTSMATERIAL
        csm_PointSize = size;
    #endif
#else
    csm_UnlitFac = 0.0;

    // csm_DiffuseColor & csm_FragColor
    #if defined IS_UNKNOWN || defined IS_SHADERMATERIAL || defined IS_MESHDEPTHMATERIAL || defined IS_MESHDISTANCEMATERIAL || defined IS_MESHNORMALMATERIAL || defined IS_SHADOWMATERIAL
        csm_DiffuseColor = vec4(1.0, 0.0, 1.0, 1.0);
        csm_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
    #else
        #ifdef USE_MAP
            vec4 _csm_sampledDiffuseColor = texture2D(map, vMapUv);

            #ifdef DECODE_VIDEO_TEXTURE
            // inline sRGB decode (TODO: Remove this code when https://crbug.com/1256340 is solved)
            _csm_sampledDiffuseColor = vec4(mix(pow(_csm_sampledDiffuseColor.rgb * 0.9478672986 + vec3(0.0521327014), vec3(2.4)), _csm_sampledDiffuseColor.rgb * 0.0773993808, vec3(lessThanEqual(_csm_sampledDiffuseColor.rgb, vec3(0.04045)))), _csm_sampledDiffuseColor.w);
            #endif

            csm_DiffuseColor = vec4(diffuse, opacity) * _csm_sampledDiffuseColor;
            csm_FragColor = vec4(diffuse, opacity) * _csm_sampledDiffuseColor;
        #else
            csm_DiffuseColor = vec4(diffuse, opacity);
            csm_FragColor = vec4(diffuse, opacity);
        #endif
    #endif

    // csm_Emissive, csm_Roughness, csm_Metalness
    #if defined IS_MESHSTANDARDMATERIAL || defined IS_MESHPHYSICALMATERIAL
        csm_Emissive = emissive;
        csm_Roughness = roughness;
        csm_Metalness = metalness;

        #ifdef USE_IRIDESCENCE
            csm_Iridescence = iridescence;
        #else
            csm_Iridescence = 0.0;
        #endif

        #if defined IS_MESHPHYSICALMATERIAL
            #ifdef USE_CLEARCOAT
                csm_Clearcoat = clearcoat;
                csm_ClearcoatRoughness = clearcoatRoughness;
            #else
                csm_Clearcoat = 0.0;
                csm_ClearcoatRoughness = 0.0;
            #endif

            #ifdef USE_TRANSMISSION
                csm_Transmission = transmission;
                csm_Thickness = thickness;
            #else
                csm_Transmission = 0.0;
                csm_Thickness = 0.0;
            #endif
        #endif
    #endif

    // csm_AO
    #if defined IS_MESHSTANDARDMATERIAL || defined IS_MESHPHYSICALMATERIAL || defined IS_MESHBASICMATERIAL || defined IS_MESHLAMBERTMATERIAL || defined IS_MESHPHONGMATERIAL || defined IS_MESHTOONMATERIAL
        csm_AO = 0.0;
    #endif

    #if defined IS_MESHLAMBERTMATERIAL || defined IS_MESHMATCAPMATERIAL || defined IS_MESHNORMALMATERIAL || defined IS_MESHPHONGMATERIAL || defined IS_MESHPHYSICALMATERIAL || defined IS_MESHSTANDARDMATERIAL || defined IS_MESHTOONMATERIAL || defined IS_SHADOWMATERIAL 
        #ifdef FLAT_SHADED
            vec3 fdx = dFdx( vViewPosition );
            vec3 fdy = dFdy( vViewPosition );
            csm_FragNormal = normalize( cross( fdx, fdy ) );
        #else
            csm_FragNormal = normalize(vNormal);
            #ifdef DOUBLE_SIDED
                csm_FragNormal *= gl_FrontFacing ? 1.0 : - 1.0;
            #endif
        #endif
    #endif

    csm_DepthAlpha = 1.0;
#endif
`,rn=`
    varying mat4 csm_internal_vModelViewMatrix;
`,ri=`
    csm_internal_vModelViewMatrix = modelViewMatrix;
`,ro=`
    varying mat4 csm_internal_vModelViewMatrix;
`,rs=`
    
`,rl="csm_DiffuseColor",rc="csm_Roughness",ru="csm_Metalness",rf="csm_Emissive",rh="csm_AO",rd="csm_FragNormal",rp="csm_Clearcoat",rm="csm_ClearcoatRoughness",rv="csm_ClearcoatNormal",rg="csm_Transmission",ry="csm_Thickness",rw="csm_Iridescence",r_="csm_PointSize",rM="csm_FragColor",rx="csm_DepthAlpha",rS="csm_UnlitFac",rb="csm_Position",rA="csm_PositionRaw",rE="csm_Normal",rT={[`${rb}`]:"*",[`${rA}`]:"*",[`${rE}`]:"*",[`${rx}`]:"*",[`${r_}`]:["PointsMaterial"],[`${rl}`]:"*",[`${rM}`]:"*",[`${rd}`]:"*",[`${rS}`]:"*",[`${rf}`]:["MeshStandardMaterial","MeshPhysicalMaterial"],[`${rc}`]:["MeshStandardMaterial","MeshPhysicalMaterial"],[`${ru}`]:["MeshStandardMaterial","MeshPhysicalMaterial"],[`${rw}`]:["MeshStandardMaterial","MeshPhysicalMaterial"],[`${rh}`]:["MeshStandardMaterial","MeshPhysicalMaterial","MeshBasicMaterial","MeshLambertMaterial","MeshPhongMaterial","MeshToonMaterial"],[`${rp}`]:["MeshPhysicalMaterial"],[`${rm}`]:["MeshPhysicalMaterial"],[`${rv}`]:["MeshPhysicalMaterial"],[`${rg}`]:["MeshPhysicalMaterial"],[`${ry}`]:["MeshPhysicalMaterial"]},rI={"*":{"#include <lights_physical_fragment>":tC.ShaderChunk.lights_physical_fragment,"#include <transmission_fragment>":tC.ShaderChunk.transmission_fragment},[`${rE}`]:{"#include <beginnormal_vertex>":`
    vec3 objectNormal = ${rE};
    #ifdef USE_TANGENT
	    vec3 objectTangent = vec3( tangent.xyz );
    #endif
    `},[`${rb}`]:{"#include <begin_vertex>":`
    vec3 transformed = ${rb};
  `},[`${rA}`]:{"#include <project_vertex>":`
    #include <project_vertex>
    gl_Position = ${rA};
  `},[`${r_}`]:{"gl_PointSize = size;":`
    gl_PointSize = ${r_};
    `},[`${rl}`]:{"#include <color_fragment>":`
    #include <color_fragment>
    diffuseColor = ${rl};
  `},[`${rM}`]:{"#include <opaque_fragment>":`
    #include <opaque_fragment>
    gl_FragColor = mix(gl_FragColor, ${rM}, ${rS});
  `},[`${rf}`]:{"vec3 totalEmissiveRadiance = emissive;":`
    vec3 totalEmissiveRadiance = ${rf};
    `},[`${rc}`]:{"#include <roughnessmap_fragment>":`
    #include <roughnessmap_fragment>
    roughnessFactor = ${rc};
    `},[`${ru}`]:{"#include <metalnessmap_fragment>":`
    #include <metalnessmap_fragment>
    metalnessFactor = ${ru};
    `},[`${rh}`]:{"#include <aomap_fragment>":`
    #include <aomap_fragment>
    reflectedLight.indirectDiffuse *= 1. - ${rh};
    `},[`${rd}`]:{"#include <normal_fragment_maps>":`
      #include <normal_fragment_maps>
      normal = ${rd};
    `},[`${rx}`]:{"gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );":`
      gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity * 1.0 - ${rx} );
    `,"gl_FragColor = packDepthToRGBA( fragCoordZ );":`
      if(${rx} < 1.0) discard;
      gl_FragColor = packDepthToRGBA( dist );
    `,"gl_FragColor = packDepthToRGBA( dist );":`
      if(${rx} < 1.0) discard;
      gl_FragColor = packDepthToRGBA( dist );
    `},[`${rp}`]:{"material.clearcoat = clearcoat;":`material.clearcoat = ${rp};`},[`${rm}`]:{"material.clearcoatRoughness = clearcoatRoughness;":`material.clearcoatRoughness = ${rm};`},[`${rv}`]:{"#include <clearcoat_normal_fragment_begin>":`
      vec3 csm_coat_internal_orthogonal = csm_ClearcoatNormal - (dot(csm_ClearcoatNormal, nonPerturbedNormal) * nonPerturbedNormal);
      vec3 csm_coat_internal_projectedbump = mat3(csm_internal_vModelViewMatrix) * csm_coat_internal_orthogonal;
      vec3 clearcoatNormal = normalize(nonPerturbedNormal - csm_coat_internal_projectedbump);
    `},[`${rg}`]:{"material.transmission = transmission;":`
      material.transmission = ${rg};
    `},[`${ry}`]:{"material.thickness = thickness;":`
      material.thickness = ${ry};
    `},[`${rw}`]:{"material.iridescence = iridescence;":`
      material.iridescence = ${rw};
    `}},rC={clearcoat:[rp,rv,rm],transmission:[rg],iridescence:[rw]};function rR(e){return e.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g,"")}class rF extends rt.Material{constructor({baseMaterial:e,vertexShader:t,fragmentShader:r,uniforms:a,patchMap:n,cacheKey:i,...o}){let s;if(!e)throw Error("CustomShaderMaterial: baseMaterial is required.");if(!function(e){try{new e}catch(e){if(e.message.indexOf("is not a constructor")>=0)return!1}return!0}(e)?Object.assign(s=e,o):s=new e(0===Object.keys(o).length?void 0:o),["ShaderMaterial","RawShaderMaterial"].includes(s.type))throw Error(`CustomShaderMaterial does not support ${s.type} as a base material.`);super(),this.uniforms={},this.vertexShader="",this.fragmentShader="";const l=s;l.name=`CustomShaderMaterial<${s.name||s.type}>`,l.update=this.update,l.__csm={prevOnBeforeCompile:s.onBeforeCompile,baseMaterial:s,vertexShader:t,fragmentShader:r,uniforms:a,patchMap:n,cacheKey:i};const c={...l.uniforms||{},...a||{}};l.uniforms=this.uniforms=c,l.vertexShader=this.vertexShader=t||"",l.fragmentShader=this.fragmentShader=r||"",l.update({fragmentShader:l.fragmentShader,vertexShader:l.vertexShader,uniforms:l.uniforms,patchMap:n,cacheKey:i}),Object.assign(this,l);const u=Object.getOwnPropertyDescriptors(Object.getPrototypeOf(l));for(const e in u){const t=u[e];(t.get||t.set)&&Object.defineProperty(this,e,t)}return Object.defineProperty(this,"type",{get:()=>s.type,set(e){s.type=e}}),this}update({fragmentShader:e,vertexShader:t,uniforms:r,cacheKey:a,patchMap:n}){let i=rR(t||""),o=rR(e||""),s=this;r&&(s.uniforms=r),t&&(s.vertexShader=t),e&&(s.fragmentShader=e),Object.entries(rC).forEach(([e,t])=>{for(let r in t){let a=t[r];(o&&o.includes(a)||i&&i.includes(a))&&(s[e]||(s[e]=1))}});let l=s.__csm.prevOnBeforeCompile,c=(e,t,r)=>{let a,n="";if(t){let e=t.search(/void\s+main\s*\(\s*\)\s*{/);if(-1!==e){n=t.slice(0,e);let r=0,i=-1;for(let a=e;a<t.length;a++)if("{"===t[a]&&r++,"}"===t[a]&&0==--r){i=a;break}if(-1!==i){let r=t.slice(e,i+1);a=r.slice(r.indexOf("{")+1,-1)}}else n=t}if(r&&t&&t.includes(rM)&&a&&(a=`csm_UnlitFac = 1.0;
`+a),e.includes("//~CSM_DEFAULTS")){let t=(e=e.replace("void main() {",`
          // THREE-CustomShaderMaterial by Faraz Shaikh: https://github.com/FarazzShaikh/THREE-CustomShaderMaterial
  
          ${n}
          
          void main() {
          `)).lastIndexOf("//~CSM_MAIN_END");if(-1!==t){let r=`
            ${a?`${a}`:""}
            //~CSM_MAIN_END
          `;e=e.slice(0,t)+r+e.slice(t)}}else e=e.replace(/void\s*main\s*\(\s*\)\s*{/gm,`
          // THREE-CustomShaderMaterial by Faraz Shaikh: https://github.com/FarazzShaikh/THREE-CustomShaderMaterial
  
          //~CSM_DEFAULTS
          ${r?ro:rn}
          ${rr}
  
          ${n}
          
          void main() {
            {
              ${ra}
            }
            ${r?rs:ri}

            ${a?`${a}`:""}
            //~CSM_MAIN_END
          `);return e};s.onBeforeCompile=(e,t)=>{null==l||l(e,t);let a=s.type,u=a?`#define IS_${a.toUpperCase()};
`:`#define IS_UNKNOWN;
`;e.vertexShader=u+`#define IS_VERTEX
`+e.vertexShader,e.fragmentShader=u+`#define IS_FRAGMENT
`+e.fragmentShader;let f=t=>{for(let r in t){let n="*"===r||i&&i.includes(r);if("*"===r||o&&o.includes(r)||n){let n=rT[r];if(n&&"*"!==n&&(Array.isArray(n)?!n.includes(a):n!==a))return void console.error(`CustomShaderMaterial: ${r} is not available in ${a}. Shader cannot compile.`);let i=t[r];for(let t in i){let r=i[t];if("object"==typeof r){let a=r.type,n=r.value;"fs"===a?e.fragmentShader=e.fragmentShader.replace(t,n):"vs"===a&&(e.vertexShader=e.vertexShader.replace(t,n))}else r&&(e.vertexShader=e.vertexShader.replace(t,r),e.fragmentShader=e.fragmentShader.replace(t,r))}}}};f(rI),f(n||{}),e.vertexShader=c(e.vertexShader,i,!1),e.fragmentShader=c(e.fragmentShader,o,!0),r&&(e.uniforms={...e.uniforms,...s.uniforms}),s.uniforms=e.uniforms};let u=s.customProgramCacheKey;s.customProgramCacheKey=()=>((null==a?void 0:a())||function(e){let t=0;for(let r=0;r<e.length;r++)t=e.charCodeAt(r)+(t<<6)+(t<<16)-t;return String(t>>>0)}((i||"")+(o||"")))+(null==u?void 0:u.call(s)),s.needsUpdate=!0}clone(){return new this.constructor({baseMaterial:this.__csm.baseMaterial.clone(),vertexShader:this.__csm.vertexShader,fragmentShader:this.__csm.fragmentShader,uniforms:this.__csm.uniforms,patchMap:this.__csm.patchMap,cacheKey:this.__csm.cacheKey})}}let rP=I.forwardRef(function({baseMaterial:e,vertexShader:t,fragmentShader:r,uniforms:a,cacheKey:n,patchMap:i,attach:o,...s},l){var c,u;let f,h=I.useMemo(()=>new rF({baseMaterial:e,vertexShader:t,fragmentShader:r,uniforms:a,cacheKey:n,patchMap:i,...s}),[e]);return c=()=>{h.dispose(),h.update({vertexShader:t,fragmentShader:r,uniforms:a,patchMap:i,cacheKey:n})},u=[t,r,a,i,n],f=I.useRef(!1),I.useEffect(()=>{if(f.current)return c();f.current=!0},u),I.useEffect(()=>()=>h.dispose(),[h]),(0,T.jsx)("primitive",{ref:l,attach:o??"material",object:h,...s})});function rz(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function rO(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=Array(t);r<t;r++)a[r]=e[r];return a}function rL(e,t){if(e){if("string"==typeof e)return rO(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return rO(e,t)}}function rU(e){return function(e){if(Array.isArray(e))return rO(e)}(e)||function(e){if("u">typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||rL(e)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}new P.Vector2,new P.Vector2;function rD(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}var rk=function e(t,r,a){var n=this;rD(this,e),rz(this,"dot2",function(e,t){return n.x*e+n.y*t}),rz(this,"dot3",function(e,t,r){return n.x*e+n.y*t+n.z*r}),this.x=t,this.y=r,this.z=a},rH=[new rk(1,1,0),new rk(-1,1,0),new rk(1,-1,0),new rk(-1,-1,0),new rk(1,0,1),new rk(-1,0,1),new rk(1,0,-1),new rk(-1,0,-1),new rk(0,1,1),new rk(0,-1,1),new rk(0,1,-1),new rk(0,-1,-1)],rB=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],rN=Array(512),rj=Array(512),r$=0;(r$=Math.floor(r$))<256&&(r$|=r$<<8);for(var rV,rG=0;rG<256;rG++)rV=1&rG?rB[rG]^255&r$:rB[rG]^r$>>8&255,rN[rG]=rN[rG+256]=rV,rj[rG]=rj[rG+256]=rH[rV%12];function rW(e){var t=function(e){if("number"==typeof e)e=Math.abs(e);else if("string"==typeof e){var t=e;e=0;for(var r=0;r<t.length;r++)e=(e+(r+1)*(t.charCodeAt(r)%96))%0x7fffffff}return 0===e&&(e=311),e}(e);return function(){var e=48271*t%0x7fffffff;return t=e,e/0x7fffffff}}new function e(t){var r=this;rD(this,e),rz(this,"seed",0),rz(this,"init",function(e){r.seed=e,r.value=rW(e)}),rz(this,"value",rW(this.seed)),this.init(t)}(Math.random());var rq=function(e){return 1/(1+e+.48*e*e+.235*e*e*e)};function rX(e,t,r){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:.25,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:.01,i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1/0,o=arguments.length>6&&void 0!==arguments[6]?arguments[6]:rq,s=arguments.length>7&&void 0!==arguments[7]?arguments[7]:.001,l="velocity_"+t;if(void 0===e.__damp&&(e.__damp={}),void 0===e.__damp[l]&&(e.__damp[l]=0),Math.abs(e[t]-r)<=s)return e[t]=r,!1;var c=2/(a=Math.max(1e-4,a)),u=o(c*n),f=e[t]-r,h=r,d=i*a;f=Math.min(Math.max(f,-d),d),r=e[t]-f;var p=(e.__damp[l]+c*f)*n;e.__damp[l]=(e.__damp[l]-c*p)*u;var m=r+(f+p)*u;return h-e[t]>0==m>h&&(m=h,e.__damp[l]=(m-h)/n),e[t]=m,!0}var rY=new P.Vector3,rZ=new P.Quaternion,rK=new P.Quaternion,rQ=new P.Matrix4,rJ=new P.Vector3;function r0(e,t,r,a,n,i,o,s){var l,c,u,f;return rX(e,t,e[t]+(u=(l=r-e[t])-Math.floor(l/(c=2*Math.PI))*c,(f=Math.max(0,Math.min(c,u)))>Math.PI&&(f-=2*Math.PI),f),a,n,i,o,s)}var r1=new P.Vector2,r2=new P.Vector3;function r3(e,t,r,a,s,l,c){return"number"==typeof t?r2.setScalar(t):Array.isArray(t)?r2.set(t[0],t[1],t[2]):r2.copy(t),n=rX(e,"x",r2.x,r,a,s,l,c),i=rX(e,"y",r2.y,r,a,s,l,c),o=rX(e,"z",r2.z,r,a,s,l,c),n||i||o}var r5=new P.Vector4,r4=new P.Euler,r6=new P.Color,r8=new P.Quaternion,r7=new P.Vector4,r9=new P.Vector4,ae=new P.Vector4;function at(e,t,r,a,n,i,o){Array.isArray(t)?r8.set(t[0],t[1],t[2],t[3]):r8.copy(t);var s=e.dot(r8)>0?1:-1;return r8.x*=s,r8.y*=s,r8.z*=s,r8.w*=s,g=rX(e,"x",r8.x,r,a,n,i,o),y=rX(e,"y",r8.y,r,a,n,i,o),w=rX(e,"z",r8.z,r,a,n,i,o),_=rX(e,"w",r8.w,r,a,n,i,o),r7.set(e.x,e.y,e.z,e.w).normalize(),r9.set(e.__damp.velocity_x,e.__damp.velocity_y,e.__damp.velocity_z,e.__damp.velocity_w),ae.copy(r7).multiplyScalar(r9.dot(r7)/r7.dot(r7)),e.__damp.velocity_x-=ae.x,e.__damp.velocity_y-=ae.y,e.__damp.velocity_z-=ae.z,e.__damp.velocity_w-=ae.w,e.set(r7.x,r7.y,r7.z,r7.w),g||y||w||_}var ar=new P.Spherical,aa=new P.Matrix4,an=new P.Vector3,ai=new P.Quaternion,ao=new P.Vector3,as=Object.freeze({__proto__:null,rsqw:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.01,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1/(2*Math.PI);return r/Math.atan(1/t)*Math.atan(Math.sin(2*Math.PI*e*a)/t)},exp:rq,linear:function(e){return e},sine:{in:function(e){return 1-Math.cos(e*Math.PI/2)},out:function(e){return Math.sin(e*Math.PI/2)},inOut:function(e){return-(Math.cos(Math.PI*e)-1)/2}},cubic:{in:function(e){return e*e*e},out:function(e){return 1-Math.pow(1-e,3)},inOut:function(e){return e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2}},quint:{in:function(e){return e*e*e*e*e},out:function(e){return 1-Math.pow(1-e,5)},inOut:function(e){return e<.5?16*e*e*e*e*e:1-Math.pow(-2*e+2,5)/2}},circ:{in:function(e){return 1-Math.sqrt(1-Math.pow(e,2))},out:function(e){return Math.sqrt(1-Math.pow(e-1,2))},inOut:function(e){return e<.5?(1-Math.sqrt(1-Math.pow(2*e,2)))/2:(Math.sqrt(1-Math.pow(-2*e+2,2))+1)/2}},quart:{in:function(e){return e*e*e*e},out:function(e){return 1- --e*e*e*e},inOut:function(e){return e<.5?8*e*e*e*e:1-8*--e*e*e*e}},expo:{in:function(e){return 0===e?0:Math.pow(2,10*e-10)},out:function(e){return 1===e?1:1-Math.pow(2,-10*e)},inOut:function(e){return 0===e?0:1===e?1:e<.5?Math.pow(2,20*e-10)/2:(2-Math.pow(2,-20*e+10))/2}},damp:rX,dampLookAt:function(e,t,r,a,n,i,o){"number"==typeof t?rY.setScalar(t):Array.isArray(t)?rY.set(t[0],t[1],t[2]):rY.copy(t);var s=e.parent;(e.updateWorldMatrix(!0,!1),rJ.setFromMatrixPosition(e.matrixWorld),e&&e.isCamera||e&&e.isLight)?rQ.lookAt(rJ,rY,e.up):rQ.lookAt(rY,rJ,e.up),at(e.quaternion,rK.setFromRotationMatrix(rQ),r,a,n,i,o),s&&(rQ.extractRotation(s.matrixWorld),rZ.setFromRotationMatrix(rQ),at(e.quaternion,rK.copy(e.quaternion).premultiply(rZ.invert()),r,a,n,i,o))},dampAngle:r0,damp2:function(e,t,n,i,o,s,l){return"number"==typeof t?r1.setScalar(t):Array.isArray(t)?r1.set(t[0],t[1]):r1.copy(t),r=rX(e,"x",r1.x,n,i,o,s,l),a=rX(e,"y",r1.y,n,i,o,s,l),r||a},damp3:r3,damp4:function(e,t,r,a,n,i,o){return"number"==typeof t?r5.setScalar(t):Array.isArray(t)?r5.set(t[0],t[1],t[2],t[3]):r5.copy(t),s=rX(e,"x",r5.x,r,a,n,i,o),l=rX(e,"y",r5.y,r,a,n,i,o),c=rX(e,"z",r5.z,r,a,n,i,o),u=rX(e,"w",r5.w,r,a,n,i,o),s||l||c||u},dampE:function(e,t,r,a,n,i,o){return Array.isArray(t)?r4.set(t[0],t[1],t[2],t[3]):r4.copy(t),f=r0(e,"x",r4.x,r,a,n,i,o),h=r0(e,"y",r4.y,r,a,n,i,o),d=r0(e,"z",r4.z,r,a,n,i,o),f||h||d},dampC:function(e,t,r,a,n,i,o){return t instanceof P.Color?r6.copy(t):Array.isArray(t)?r6.setRGB(t[0],t[1],t[2]):r6.set(t),p=rX(e,"r",r6.r,r,a,n,i,o),m=rX(e,"g",r6.g,r,a,n,i,o),v=rX(e,"b",r6.b,r,a,n,i,o),p||m||v},dampQ:at,dampS:function(e,t,r,a,n,i,o){return Array.isArray(t)?ar.set(t[0],t[1],t[2]):ar.copy(t),M=rX(e,"radius",ar.radius,r,a,n,i,o),x=r0(e,"phi",ar.phi,r,a,n,i,o),S=r0(e,"theta",ar.theta,r,a,n,i,o),M||x||S},dampM:function(e,t,r,a,n,i,o){return void 0===e.__damp&&(e.__damp={position:new P.Vector3,rotation:new P.Quaternion,scale:new P.Vector3},e.decompose(e.__damp.position,e.__damp.rotation,e.__damp.scale)),Array.isArray(t)?aa.set.apply(aa,rU(t)):aa.copy(t),aa.decompose(an,ai,ao),b=r3(e.__damp.position,an,r,a,n,i,o),A=at(e.__damp.rotation,ai,r,a,n,i,o),E=r3(e.__damp.scale,ao,r,a,n,i,o),e.compose(e.__damp.position,e.__damp.rotation,e.__damp.scale),b||A||E}});let al=`
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`,ac=`
uniform float uTime;
uniform float uAmp;
uniform float uFreq;
uniform float uSpeed;
uniform vec3 uPointer;
uniform float uPointerStrength;

${al}

float displaceAmount(vec3 p) {
  float n = snoise(p * uFreq + uTime * uSpeed);
  n += 0.45 * snoise(p * uFreq * 2.1 + uTime * uSpeed * 1.7);
  float breathe = 1.0 + 0.15 * sin(uTime * 0.35);
  float swell = uPointerStrength * smoothstep(0.9, 0.0, distance(normalize(p), uPointer));
  return uAmp * breathe * n * 0.69 + swell;
}

vec3 displaced(vec3 p) {
  vec3 dir = normalize(p);
  return p + dir * displaceAmount(p);
}

void main() {
  vec3 p = position;
  vec3 n = normalize(position);

  float eps = 0.04;
  vec3 helper = abs(n.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 tangent = normalize(cross(n, helper));
  vec3 bitangent = cross(n, tangent);

  vec3 pos = displaced(p);
  vec3 posT = displaced(p + tangent * eps);
  vec3 posB = displaced(p + bitangent * eps);

  csm_Position = pos;
  csm_Normal = normalize(cross(posT - pos, posB - pos));
}
`,au=`
attribute float aSeed;
uniform float uTime;
uniform float uSize;
varying float vAlpha;

void main() {
  vec3 p = position;
  float t = uTime * 0.06 + aSeed * 100.0;
  p.x += sin(t * 1.3 + aSeed * 6.28) * 0.45;
  p.y += sin(t * 0.9 + aSeed * 12.0) * 0.55;
  p.z += cos(t * 1.1 + aSeed * 9.0) * 0.45;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (4.0 / -mv.z);
  vAlpha = 0.2 + 0.5 * fract(aSeed * 7.31);
}
`,af=`
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.12, d) * vAlpha;
  if (a < 0.01) discard;
  gl_FragColor = vec4(vec3(0.95), a);
}
`,ah=`
uniform float uTime;
uniform float uSize;
varying float vBright;

void main() {
  vec3 p = position;
  float w1 = sin(p.x * 0.5 + uTime * 0.85);
  float w2 = sin((p.x * 0.32 + p.y) * 0.75 + uTime * 1.05);
  float w3 = sin((p.y * 0.9 - p.x * 0.18) * 1.3 + uTime * 0.6);
  float h = w1 * 0.6 + w2 * 0.45 + w3 * 0.22;
  p.z = h;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (9.0 / -mv.z);
  vBright = mix(0.05, 1.0, (h + 1.27) / 2.54);
}
`,ad=`
varying float vBright;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  gl_FragColor = vec4(vec3(vBright), 1.0);
}
`,ap=`
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,am=`
uniform float uTime;
uniform float uIntensity;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * vnoise(p);
    p = p * 2.03 + vec2(13.7);
    a *= 0.55;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  float n1 = fbm(uv * vec2(2.6, 3.4) + vec2(uTime * 0.022, -uTime * 0.014));
  float n2 = fbm(uv * vec2(5.5, 7.0) - vec2(uTime * 0.017, uTime * 0.021) + 41.3);
  float smoke = smoothstep(0.42, 1.15, n1 * 0.72 + n2 * 0.46);
  float topGlow = smoothstep(0.05, 0.95, uv.y);
  float centerFade = 1.0 - smoothstep(0.25, 0.75, abs(uv.x - 0.5));
  float a = smoke * topGlow * (0.45 + 0.55 * centerFade) * uIntensity;
  gl_FragColor = vec4(vec3(1.0), a);
}
`,av=`
varying vec2 vUv;
uniform float uIntensity;

void main() {
  float a = smoothstep(0.15, 1.0, vUv.y) * uIntensity;
  gl_FragColor = vec4(vec3(1.0), a);
}
`,ag=new P.Vector3,ay=new P.Quaternion;function aw({detail:e,matcap:t=!1,scale:r=1,position:a=[0,0,0],amp:n=.22,freq:i=1.4,speed:o=.12,spinSpeed:s=.05,pointerFollow:l=!1}){let c=(0,I.useRef)(null),u=(0,I.useRef)(0),f=(0,I.useMemo)(()=>{let t=new P.IcosahedronGeometry(1,e),r=function(e,t=1e-4){t=Math.max(t,Number.EPSILON);let r={},a=e.getIndex(),n=e.getAttribute("position"),i=a?a.count:n.count,o=0,s=Object.keys(e.attributes),l={},c={},u=[],f=["getX","getY","getZ","getW"];for(let t=0,r=s.length;t<r;t++){let r=s[t];l[r]=[];let a=e.morphAttributes[r];a&&(c[r]=Array(a.length).fill(0).map(()=>[]))}let h=Math.pow(10,Math.log10(1/t));for(let t=0;t<i;t++){let n=a?a.getX(t):t,i="";for(let t=0,r=s.length;t<r;t++){let r=s[t],a=e.getAttribute(r),o=a.itemSize;for(let e=0;e<o;e++)i+=`${~~(a[f[e]](n)*h)},`}if(i in r)u.push(r[i]);else{for(let t=0,r=s.length;t<r;t++){let r=s[t],a=e.getAttribute(r),i=e.morphAttributes[r],o=a.itemSize,u=l[r],h=c[r];for(let e=0;e<o;e++){let t=f[e];if(u.push(a[t](n)),i)for(let e=0,r=i.length;e<r;e++)h[e].push(i[e][t](n))}}r[i]=o,u.push(o),o++}}let d=e.clone();for(let t=0,r=s.length;t<r;t++){let r=s[t],a=e.getAttribute(r),n=new a.array.constructor(l[r]),i=new P.BufferAttribute(n,a.itemSize,a.normalized);if(d.setAttribute(r,i),r in c)for(let t=0;t<c[r].length;t++){let a=e.morphAttributes[r][t],n=new a.array.constructor(c[r][t]),i=new P.BufferAttribute(n,a.itemSize,a.normalized);d.morphAttributes[r][t]=i}}return d.setIndex(u),d}(t);return r.computeVertexNormals(),t.dispose(),r},[e]),h=(0,I.useMemo)(()=>({uTime:{value:0},uAmp:{value:n},uFreq:{value:i},uSpeed:{value:o},uPointer:{value:new P.Vector3(0,0,1)},uPointerStrength:{value:0}}),[]);return(0,R.useFrame)((e,t)=>{let r=Math.min(t,.1);h.uTime.value+=r,l?(u.current+=s*r,as.dampE(c.current.rotation,[-.22*F.pointerState.y,u.current+.35*F.pointerState.x,0],.8,r),ag.set(1.2*F.pointerState.x,.9*F.pointerState.y,1).normalize().applyQuaternion(ay.copy(c.current.quaternion).invert()),h.uPointer.value.copy(ag),as.damp(h.uPointerStrength,"value",.1,.6,r)):(c.current.rotation.y+=s*r,c.current.rotation.x+=.35*s*r)}),(0,T.jsx)("mesh",{ref:c,geometry:f,scale:r,position:a,frustumCulled:!1,children:t?(0,T.jsx)(a_,{uniforms:h}):(0,T.jsx)(rP,{baseMaterial:P.MeshPhysicalMaterial,vertexShader:ac,uniforms:h,metalness:1,roughness:.08,envMapIntensity:1,clearcoat:.5,clearcoatRoughness:.1,color:"#93989d"})})}function a_({uniforms:e}){let t=re("/3d/matcap-silver-256.webp");return(0,T.jsx)(rP,{baseMaterial:P.MeshMatcapMaterial,vertexShader:ac,uniforms:e,matcap:t,color:"#7d8186"})}function aM({count:e,spread:t=7}){let r=(0,I.useRef)(null),a=(0,I.useMemo)(()=>{let r=new P.BufferGeometry,a=new Float32Array(3*e),n=new Float32Array(e),i=1337,o=()=>(i=16807*i%0x7fffffff)/0x7fffffff;for(let r=0;r<e;r++)a[3*r]=(o()-.5)*t,a[3*r+1]=(o()-.5)*t*.7,a[3*r+2]=(o()-.5)*t*.6,n[r]=o();return r.setAttribute("position",new P.BufferAttribute(a,3)),r.setAttribute("aSeed",new P.BufferAttribute(n,1)),r},[e,t]),n=(0,I.useMemo)(()=>({uTime:{value:0},uSize:{value:4}}),[]);return(0,R.useFrame)((e,t)=>{n.uTime.value+=Math.min(t,.1),n.uSize.value=4*e.viewport.dpr}),(0,T.jsx)("points",{geometry:a,frustumCulled:!1,children:(0,T.jsx)("shaderMaterial",{ref:r,vertexShader:au,fragmentShader:af,uniforms:n,transparent:!0,depthWrite:!1})})}function ax({size:e=2.6,children:t,scrollRef:r}){let a=(0,I.useRef)(null),n=(0,I.useMemo)(()=>{let t=new P.BoxGeometry(e,e,e),r=new P.EdgesGeometry(t);return t.dispose(),r},[e]);return(0,R.useFrame)((e,t)=>{let n=Math.min(t,.1);a.current.rotation.y+=.08*n,a.current.rotation.x=.35+(r?.current??0)*.5}),(0,T.jsxs)("group",{ref:a,rotation:[.35,.6,0],children:[(0,T.jsx)("lineSegments",{geometry:n,children:(0,T.jsx)("lineBasicMaterial",{color:"#b8b8b8",transparent:!0,opacity:.55})}),(0,T.jsxs)("mesh",{children:[(0,T.jsx)("boxGeometry",{args:[e,e,e]}),(0,T.jsx)("shaderMaterial",{vertexShader:ap,fragmentShader:av,uniforms:{uIntensity:{value:.05}},transparent:!0,side:P.BackSide,depthWrite:!1})]}),t]})}function aS({cols:e,rows:t,width:r=22,height:a=9}){let n=(0,I.useMemo)(()=>{let n=new P.BufferGeometry,i=new Float32Array(e*t*3),o=0;for(let n=0;n<t;n++)for(let s=0;s<e;s++)i[o++]=(s/(e-1)-.5)*r,i[o++]=(n/(t-1)-.5)*a,i[o++]=0;return n.setAttribute("position",new P.BufferAttribute(i,3)),n},[e,t,r,a]),i=(0,I.useMemo)(()=>({uTime:{value:0},uSize:{value:2.2}}),[]);return(0,R.useFrame)((e,t)=>{i.uTime.value+=Math.min(t,.1),i.uSize.value=2.2*e.viewport.dpr}),(0,T.jsx)("points",{geometry:n,rotation:[-1.05,0,0],frustumCulled:!1,children:(0,T.jsx)("shaderMaterial",{vertexShader:ah,fragmentShader:ad,uniforms:i,depthWrite:!1})})}function ab({intensity:e=.13,width:t=26,height:r=15,z:a=-4}){let n=(0,I.useMemo)(()=>({uTime:{value:0},uIntensity:{value:e}}),[]);return(0,R.useFrame)((e,t)=>{n.uTime.value+=Math.min(t,.1)}),(0,T.jsxs)("mesh",{position:[0,0,a],frustumCulled:!1,children:[(0,T.jsx)("planeGeometry",{args:[t,r]}),(0,T.jsx)("shaderMaterial",{vertexShader:ap,fragmentShader:am,uniforms:n,transparent:!0,depthWrite:!1})]})}var aA=e.i(91951);function aE(){let e="high"===(0,F.useThreeStore)(e=>e.tier);return{config:aA.TIER_CONFIG[e?"high":"low"],high:e}}function aT(e){if(!e)return 0;let t=e.getBoundingClientRect(),r=window.innerHeight;return P.MathUtils.clamp((r-t.top)/(r+t.height),0,1)}let aI={hero:function({trackEl:e}){let{config:t,high:r}=aE(),a=(0,I.useRef)(null),{size:n}=(0,z.useThree)(),i=n.width<640;return(0,R.useFrame)(()=>{let t=aT(e.current);a.current.position.y=1.2*t-.3,a.current.rotation.z=.25*t}),(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(t7,{makeDefault:!0,position:[0,0,4.6],fov:42}),r&&(0,T.jsx)(t8,{files:"/3d/studio_small_08_512.hdr"}),(0,T.jsx)(ab,{intensity:.14}),(0,T.jsxs)("group",{ref:a,children:[(0,T.jsx)(aw,{detail:t.blobDetail,matcap:!r,scale:i?.82:1.04,position:[0,-.08,0],pointerFollow:r,amp:.32,freq:1,speed:.09}),(0,T.jsx)(aM,{count:t.particles})]})]})},"accent-blob":function({trackEl:e}){let{config:t,high:r}=aE(),a=(0,I.useRef)(null);return(0,R.useFrame)(()=>{let t=aT(e.current);a.current.rotation.z=.5*t}),(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(t7,{makeDefault:!0,position:[0,0,4],fov:42}),r&&(0,T.jsx)(t8,{files:"/3d/studio_small_08_512.hdr"}),(0,T.jsx)("group",{ref:a,children:(0,T.jsx)(aw,{detail:t.smallBlobDetail,matcap:!r,scale:1.05,amp:.28,freq:1.7,spinSpeed:.09})})]})},"trust-cube":function({trackEl:e}){let{config:t,high:r}=aE(),a=(0,I.useRef)(0);return(0,R.useFrame)(()=>{a.current=aT(e.current)}),(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(t7,{makeDefault:!0,position:[0,0,6.6],fov:42}),r&&(0,T.jsx)(t8,{files:"/3d/studio_small_08_512.hdr"}),(0,T.jsx)(ax,{size:2.7,scrollRef:a,children:(0,T.jsx)(aw,{detail:t.smallBlobDetail,matcap:!r,scale:.85,amp:.3,freq:1.8,spinSpeed:-.07})}),(0,T.jsx)(aM,{count:Math.floor(t.particles/2),spread:9})]})},"footer-wave":function(e){let{config:t}=aE();return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(t7,{makeDefault:!0,position:[0,1.1,7],fov:50}),(0,T.jsx)(aS,{cols:t.waveCols,rows:t.waveRows})]})}};function aC({onFirstFrame:e}){let t=(0,I.useRef)(!1);return(0,R.useFrame)(()=>{t.current||(t.current=!0,e())}),null}e.s(["default",0,function({scene:e,trackRef:t,onFirstFrame:r}){let a=aI[e];return(0,I.useEffect)(()=>{let e=t.current;if(!e)return;let r=!1,a=new IntersectionObserver(([e])=>{e.isIntersecting&&!r?(r=!0,F.useThreeStore.getState().addVisibleView(1)):!e.isIntersecting&&r&&(r=!1,F.useThreeStore.getState().addVisibleView(-1))},{rootMargin:"50%"});return a.observe(e),()=>{a.disconnect(),r&&F.useThreeStore.getState().addVisibleView(-1)}},[t]),(0,T.jsx)(C.View,{className:"absolute inset-0",children:(0,T.jsxs)(I.Suspense,{fallback:null,children:[(0,T.jsx)(a,{trackEl:t}),(0,T.jsx)(aC,{onFirstFrame:r})]})})}],49543)},59411,e=>{e.n(e.i(49543))}]);