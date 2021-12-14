const PORT = 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app =express();

app.use(cors());

const url_icons = 'https://simpleicons.org/';
const url_slugs = 'https://github.com/simple-icons/simple-icons/blob/develop/slugs.md';


app.get('/',(req,res)=>{
    res.send(`hello from ${PORT}, this is the home page`);
});

app.get('/badges',(req,res)=>{
    axios.get(url_icons)
        .then(response => {
            const icons_html = response.data;
            const $ = cheerio.load(icons_html);
            const icons_details = [];

            $('.grid-item',icons_html).each(function(){
                const icon_name = $(this).find('.grid-item__title').text();
                const badge_color = $(this).find('.grid-item__color').text();
                const icon_obj = { icon_name,badge_color };
                icons_details.push(icon_obj);
            });
            res.json(icons_details);
        }).catch(err => {
          console.log(err);
        });
});

//galat
// app.get('/slugs',(req,res)=>{
//     axios.get(url_slugs)
//         .then(response => {
//             const icons_html = response.data;
//             const $ = cheerio.load(icons_html);
//             const icons_slugs = [];
//             let num = 1;
//             let slug_obj = {};
//             $('tr',icons_html).each(function(){
//                 if(num % 2 !== 0)
//                 {
//                     const brand_name = $(this).find('code').text();
//                     slug_obj.b_name = brand_name;
//                 }
//                 else
//                 {
//                     const brand_slug = $(this).find('code').text();
//                     slug_obj.b_slug = brand_slug;
//                     icons_slugs.push(slug_obj);
//                     slug_obj = {};
//                 }//agla tr pr chal jaaega
//             });
//             res.json(icons_slugs);
//         });
// });

app.get('/slugs', (req, res) => {
    axios.get(url_slugs)
      .then(response => {
        const icons_html = response.data;
        const $ = cheerio.load(icons_html);
        let icons_slugs = [];
        let slug_obj ={};
        let num = 1;
        $('tr', icons_html).each(function() {
          let b_each;
          let i =1;
          $(this).find('code').each(function(){
            b_each = $(this).text();
            if(i%2!==0)
              slug_obj.brand_name = b_each;
            else
            {
              slug_obj.brand_slug = b_each;
            }
            i++;
          });
          icons_slugs.push(slug_obj);
          slug_obj = {};
        });
        icons_slugs = icons_slugs.filter((s_obj)=>{
          return s_obj.brand_name !== '' && s_obj.brand_slug !== '' && Object.keys(s_obj).length !== 0;
        })
        res.json(icons_slugs);
      }).catch(err => {
        console.log(err);
      });
  });

// app.get('/badgewrite',(req,res)=>{
//     // fs.writeFile(path.join(__dirname,'db_files','badge.json'), icons_details, function (err) {
//     //   if (err) throw err;
//     //   console.log('json written for badges!');
//     // });

//     let file = fs.createWriteStream(path.join(__dirname,'db_files','badge.json'));
//     file.on('error',(err)=> { console.log(err) });
//     file.on('finish',()=> { console.log('badges written') });
//     icons_details.forEach((v)=>{ file.write(JSON.stringify(`${v}`, null, 4)+'\n'); });
//     file.end();
//     res.send('badge write page');
// });

// app.get('/slugwrite',(req,res)=>{
//     // fs.writeFile(path.join(__dirname,'db_files','slug.json'), icons_slugs, function (err) {
//     //   if (err) throw err;
//     //   console.log('json written for slugs!');
//     // });

//     let file = fs.createWriteStream(path.join(__dirname,'db_files','slug.json'));
//     file.on('error',(err)=> { console.log(err) });
//     file.on('finish',()=> { console.log('slugs written') });
//     ICONS_SLUGS.forEach((v)=>{ file.write(JSON.stringify(`${v}`, null, 4)+'\n'); });
//     file.end();
// });


app.get('/bsd',(req,res)=>{

  axios.get(url_icons)
      .then(response => {
          const icons_html = response.data;
          const $ = cheerio.load(icons_html);
          const icons_details = [];

          $('.grid-item',icons_html).each(function(){
              const icon_name = $(this).find('.grid-item__title').text();
              const badge_color = $(this).find('.grid-item__color').text();
              const icon_obj = { icon_name,badge_color };
              icons_details.push(icon_obj);
          });
          axios.get(url_slugs)
          .then(response => {
            const icons_html = response.data;
            const $ = cheerio.load(icons_html);
            let icons_slugs = [];
            let slug_obj ={};
            let num = 1;
            $('tr', icons_html).each(function() {
              let b_each;
              let i =1;
              $(this).find('code').each(function(){
                b_each = $(this).text();
                if(i%2!==0)
                  slug_obj.brand_name = b_each;
                else
                {
                  slug_obj.brand_slug = b_each;
                }
                i++;
              });
              icons_slugs.push(slug_obj);
              slug_obj = {};
            });
            icons_slugs = icons_slugs.filter((s_obj)=>{
              return s_obj.brand_name !== '' && s_obj.brand_slug !== '' && Object.keys(s_obj).length !== 0;
            })

            let joint_array = [];
            let joint_obj = {};
            let find_obj;
                for(let i=0;i<icons_details.length;i++)
                {
                    find_obj = icons_slugs.find(ob => ob.brand_name===icons_details[i].icon_name);
                    if(find_obj)
                    {
                      joint_obj = {...find_obj,'badge_color': icons_details[i].badge_color};
                      joint_array.push(joint_obj);
                      joint_obj = {};
                    }
                    else continue;
                }
          
                res.json(joint_array);
          });

      }).catch(err => {
        console.log(err);
      });



  // let joint_array = [];
  // let joint_obj = {};
  // let find_obj;
  //     for(let i=0;i<icons_details.length;i++)
  //     {
  //         find_obj = icons_slugs.find(ob => ob.brand_name===icons_details[i].icon_name);
  //         if(find_obj)
  //         {
  //           joint_obj = {...find_obj,'badge_color': icons_details[i].badge_color};
  //           joint_array.push(joint_obj);
  //           joint_obj = {};
  //         }
  //         else continue;
  //     }

  //     res.json(joint_array);
});


app.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`);
})


//sahi
// app.get('/slugs', (req, res) => {
//     axios.get(url_slugs)
//       .then(response => {
//         const icons_html = response.data;
//         const $ = cheerio.load(icons_html);
//         let icons_slugs = [];
//         let slug_obj ={};
//         let num = 1;
//         $('tr', icons_html).each(function() {
//           let b_each;
//           let i =1;
//           $(this).find('code').each(function(){
//             b_each = $(this).text();
//             if(i%2!==0)
//               slug_obj.brand_name = b_each;
//             else
//             {
//               slug_obj.brand_slug = b_each;
//             }
//             i++;
//           });
//           icons_slugs.push(slug_obj);
//           slug_obj = {};
//         });
//         icons_slugs = icons_slugs.filter((s_obj)=>{
//           return s_obj.brand_name !== '' && s_obj.brand_slug !== '' && Object.keys(s_obj).length !== 0;
//         })
//         res.json(icons_slugs);
//       });
//   });
  