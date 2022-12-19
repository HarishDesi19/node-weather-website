    const express = require('express')
    const path = require('path')
    const hbs = require('hbs')
    const geocode = require('./utils/geocode')
    const reversegeocode = require('./utils/reversegeocode')

    const app = express()
    console.log(__dirname)
    console.log(path.join(__dirname,'../public'))

    const port = process.env.PORT || 3000

    const publicDirectory = path.join(__dirname,'../public')
    const viewsPath = path.join(__dirname,'../templates/views')
    const partialPath = path.join(__dirname,'../templates/partials')

    app.set('view engine','hbs')
    app.set('views',viewsPath)
    hbs.registerPartials(partialPath)

    app.use(express.static(publicDirectory))
    
    app.get('' ,(req,res) => {
        res.render('index',{
            name : 'harish',
            title:'Weather'
        })
    })

    app.get('/about' ,(req,res) => {
        res.render('about',{
            name : 'harish',
            title:'about'
        })
    })
 
    const user = {
        name : 'harish',
        title : 'help'
    }

    app.get('/help' ,(req,res) => {
        res.render('help',{
            name : 'harish',
            title:'Help'
        })
    })

    app.get('/weather',(req,res)=>{
        if(!req.query.address)
        {
            return res.send({
                error: "please provide an address for weather report"
            })
        }
        geocode(req.query.address,(error,{latitude,longitude} = {})=>{
            if(error)
            {
                res.send({
                    error: error
                })
            }
            reversegeocode(latitude,longitude,(error,{latitude,longitude,location,body} = {})=>{
                if(error)
            {
                return res.send([
                    {
                    error:error
                }
                ])
            }
            res.send([
                {
    
                    forecaste : 'its sunny outside',
                    latitude : latitude,
                    longitude:longitude,
                    location: location
                },{
                    body : body
                }
            ])
             })
         })
        
    })

    app.get('/products',(req,res)=>{
        if(!req.query.search)
        {
            return res.send({
                error: "you should provise a name for search"
            })
        }
        console.log(req.query)
        res.send({
            product:[]
        })
    })
 
    app.get('/help/*',(req,res) =>{
        res.render('404',{
            title:'404',
            name : 'harish',
            errorMessage: 'Help article not found'
        })
    })

    app.get('*',(req,res) => {
        res.render('404',{
            title:'404',
            name : 'harish',
            errorMessage: 'Page Not Found'
        })
    })

    app.listen(port, () =>{
        console.log('server is up on port' + port)
    })