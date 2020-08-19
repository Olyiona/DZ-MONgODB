// #1) Знайти всіх дітей в яких сердня оцінка 4.2
db.getCollection('students').find({
    avgScore: 4.2
    })

    // 2) Знайди всіх дітей з 1 класу   
    db.getCollection('students').find({
        class:1.0
                 })

    // 3) Знайти всіх дітей які вивчають фізику   
    db.getCollection('students').find({
        lessons: "physics"
            })            

//   4) Знайти всіх дітей, батьки яких працюють в науці ( scientist )  
db.getCollection('students').find({
    'parents.profession':'scientist'
        })
  
 // 5) Знайти дітей, в яких середня оцінка більша за 4
 db.getCollection('students').find({
    avgScore:{
$gt:4}
    })

    // 6) Знайти найкращого учня
     // вариант 1
    db.getCollection('students')
    .find({
        avgScore:5})
      .limit(1)
 // вариант 2
      db.getCollection('students')
      .aggregate([{
      $group:{"_id":0,
          
      sumP:{$max:'$avgScore'}
      }}]
      
          ) 
    
    //   7) Знайти найгіршого учня  
    // вариант 1
    db.getCollection('students')
    .find({
        avgScore:2.12})
      .limit(1)

// вариант 2
      db.getCollection('students')
      .aggregate([{
      $group:{"_id":0,
          
      sumP:{$min:'$avgScore'}
      }}]
      
          )
      
    //   8) Знайти топ 3 учнів     
    db.getCollection('students')
    .find({avgScore:5
        })
      .limit(3)

    //   9) Знайти середній бал по школі   
    db.getCollection('students')
    .aggregate([{
    $group:{"_id":0,
        
    sumP:{$avg:'$avgScore'}}}]
        )
    
     // 10) Знайти середній бал дітей які вивчають математику або фізику   
     db.getCollection('students')
     .aggregate([
     {$match:{lessons:'mathematics', lessons:'physics'}},
    
      
     {
     $group:{"_id":0,
         
     sumP:{$avg:'$avgScore'}}}]
         )
         
        //  11) Знайти середній бал по 2 класі
        db.getCollection('students')
        .aggregate([{
        $match:{class:{$eq:2}}},
            
        {$group:{_id:'class2',avgGrade:{$avg:'avgScore'}}}])
//         12) Знайти дітей з не повною сімєю

// 13) Знайти батьків які не працюють
db.getCollection('students')
    .find({'parents.profession':null}
        )

// 14) Не працюючих батьків влаштувати офіціантами
db.getCollection('students')
    .update({$and:[
       { parents:{$ne:null}},
        {'parents.profession':null}
        ]},
        {$set:{'parents.$[]profession': 'waiter'}},
        {upsert:true}
        )

// 15) Вигнати дітей, які мають середній бал менше ніж 2.5
db.getCollection('students')
    .remove({
        avgScore:{$lt:2.5}})

// 16) Дітям, батьки яких працюють в освіті ( teacher ) поставити 5


// 17) Знайти дітей які вчаться в початковій школі (до 5 класу) і вивчають фізику ( physics )
db.getCollection('students').find({class:{$lte:5},lessons:'physics'})

// 18) Знайти найуспішніший клас