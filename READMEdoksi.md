# Alkalmazások fejlesztése beadandó feladat

Készítette: Bagoly Kunigunda, Dorogi Benjamin, Fenyvesi Attila

## KÖVETELMÉNYANALÍZIS

### 1.1. Célkitűzés

#### 1.1.1. Projektindító dokumentum

__Ez egy olyan alkalmazás, amellyel egy munkacsoport__ (pl. egy adott cégen belüli dolgozók, hallgatók tanulócsoportja) __egy több részből álló projektet menedzselhetnek, nyilvántarthatják annak részfeladatait.__

Amiután egy felhasználó regisztrál az oldalra, lehetősége van új projektet létrehozni, annak részfeladatokat(task-okat) létrehozni és más felhasználókat rendelhet hozzá a részfeladatokhoz. 

<TODOOO>

#### 1.1.2. Funkcionális elvárások

A programba kétféle adattípust lehet rögzíteni:
* feladatokat
* humán erőforrásokat (dolgozókat)
 
A feladatok részei:
* A feladatok részfeladatokból állnak.
* A részfeladatoknak megadható:
  * mik az előfeltételei (más részfeladatok)
  * melyekkel végezhető párhuzamosan
  * mik az erőforrás igényei
 
A dolgozók adatai:
* személyes adatok (név, cím, beosztás, fizetés, stb.)
* képességek egy 5-ös skálán (pl.: PHP: 5/5; Java: 3/5; stb.)
 
<del>Egy munkamenet létrehozása után a program megadja, hogy mely dolgozóknak mely részfeladatokon kell dolgozniuk a leghatékonyabb munkavégzés érdekében.</del> A programba a dolgozók a saját azonosítójukkal be tudnak lépni, és az általuk elvégzett részfeladatokat jóvá tudják hagyni, így nyomon követhető a project végrehajtásának a menete.

### 1.1.3. Nem funkcionális elvárások

* Felhasználóbarát, egyszerű, letisztult felület
* Keresési eredmények gyors megjelenítése
* Jelszavas azonosítás, jelszavak biztonságos tárolása
* A projekten belüli feladatokhoz és részfeladatokhoz összefüggési gráf generálása
* Privát képek biztonságos elrejtése a látogatók elől

### 1.2. Szakterületi fogalomjegyzék
* __projekt / project__: adott szervezeti környezetben megtervezett és végrehajtott tevékenységsorozat, amely konkrét célokat valósít meg, és a célok eléréséhez erőforrásokat rendel. Időben és térben jól körülhatárolt összetett feladat
* __felhasználó / user__: regisztrált és bejelentkezett látogató, aki létrehozhat új projektet, feladatokat vállalhat egy projekten belül, bejegyezheti a feladataihoz hogy elvégezte őket. Létrehozhatja saját profilját, megadhatja skill-jeit, ez alapján oszthatják be más felhasználók taskokhoz. 
* __skill__: egy felhasználó megadhatja tulajdonságait, erősségeit, képességeit, ami segíti eligazodni a projektmenedzsereket, hogy az adott felhasználót milyen taskokhoz érdemes beosztani. (pl. C++ programozás, kávéfőzés, számítógépes grafikák készítése).
* <TODOOOO>
 









### Nemfunkcionális követelmények

A programmal szemben támasztott alapvető elvárás - a várhatóan széleskörű és változatos felhasználásból eredendően - a platformfüggetlenség. A programnak futnia kell a legnépszerűbb platformokon (Windows, Linux, OS X).

### Szakterületi követelmények

A programnak képesnek kell lennie bármely szakterület projectmenedzselési feladatainak ellátására, így az általános információk (pl. személyes adatok) rögzítésén túl az üzemeltető számára lehetővé kell tenni, hogy a szakterületre jellemző speciális adatokat (pl. dolgozók képességei vagy a részfeladatok erőforrás igényei) személyre szabhassa.

### Szerepkörök

Admin:
 * Mindenhez (is) hozzáfér

Group Leader :
 * Project létrehozás
 * Memberek csoportba vétele
 * Skillek felvétele
 * Feladatok memberekhez rendelése
 * Folyamatok ellenőrzése

Group Member :
 * Saját skillek megadása
 * Feladat elvégzése (log : idő, kész vagy sem)
 * Folyamat megtekintése

### Adatbázis :
 * Users
   * név
   * jelszó
   * skills
 * Groups
   * name
   * Project (by id)
   * members:roles
 * Task
   * required skill
   * assignee
   * prerequisites
   * complete
   * project_id
 * Project
   * group
   * tasks (json)
   * deadline
   * name
 * Skills
   * name
   * code

### Endpointok
 * user/new
   * *createMember(String name,String password,String role,List<Integer> skills) --a skillek id szerint vannak tárolva*
 * user/edit
   * *modifyUser(String newName, String newPassword)*
 * user/addskills
   * *addSkills(List<Integer> skills) --a skillek id szerint vannak tárolva*
 * member/project/tasks
   * *getTasks(User user)*
 * member/project/completeTask
   * *completeTask(Integer duration)*
 * member/project/getStatus
    * *getProjectStatus(Project project)*
 * leader/group/create
   * *createGroup(String groupName,List<User> members)*
 * leader/group/members/add
   * *addGroupMember(Group group,User member)*
 * leader/group/members/remove
   * *removeGroupMember(Group group, User member)*
 * leader/project/new
   * *createProject(Group group,String name)*
   * *createProject(Group group,String name,DateTime deadline)*
 * leader/project/createTask
   * *createTask(Project projectId, List<Integer> requiredSkills,List<Integer> prerequisites) --az előfeltételek id szerint vannak tárolva*
  * leader/project/assigntask
    * *assignTask(Task task,User assignee)*
  * leader/project/calculateoptimal
    * *calcOptimalAssignees(Project project)*
  * leader/project/createSkill
    * *createSkill(String name, Integer code)*
  * leader/project/getStatus
    * *getProjectStatus(Project project)*
 * admin/editusers
   * *editUser(String name, String password, String role, List<Integer> skills)*
 * admin/switchtouserprofile
  * *fogalmam nincs ezt pontosan még hogy fogjuk implementálni*
