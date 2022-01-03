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

const url_badge_link = 'https://github.com/alexandresanlim/Badges4-README.md-Profile#readme';



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
});


app.get('/badgelinks',(req,res)=>{
  axios.get(url_badge_link)
      .then(response => {
          const links_html = response.data;
          const $ = cheerio.load(links_html);
          let link_array = [];

          $('table',links_html).each(function(){
              const table_category_name = $(this).prev('h2').text();
              let category_links_array = [];
              $(this).find('tbody').find('tr').each(function(){
                  let category_link_element = $(this).find('code').text();
                  category_links_array.push(category_link_element);
              });
              const category_obj = { table_category_name,category_links_array };
              link_array.push(category_obj);
          });
          link_array = link_array.filter((val)=> val.table_category_name !== "");
          //sahi
          // fs.writeFile(path.join(__dirname,'db_files','links.json'), JSON.stringify(link_array, null, 4),()=>{
          //   console.log("file written links");
          // });
          res.json(link_array.slice(0,-2));
      }).catch(err => {
        console.log(err);
      });
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
  




