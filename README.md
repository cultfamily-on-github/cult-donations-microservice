# CULT Learn 2 Earn Microservice

CULT Learn 2 Earn gives you the chance to earn money while doing valuable things like providing education services around topics like decentralization, self-hosted wallets, deflationary currencies like CULT and RVLT, tokenomics which foster public goods creation etc. 

Here you can learn how to provide valuable education services to others by doing so. You can earn RVLT by submitting links to your education services. After that your public wallet address will be listed in the CULT Donations Microservice.  

Let us learn and earn together in playful creativity to free the world.

Learn 2 Earn is inspired by Play 2 Earn which is inspired by [Revolt 2 Earn](https://rumble.com/v1lf3yb-revolt-2-earn-in-100-seconds-michael-saylor-talks-about-revolt-2-earn.html?mref=1e5w3p&mc=4izal). 


In order to strengthen resilience, scalability, composability and technological freedom for contributors, we establish a microservices architecture. 

Everyone is invited to foster the emergence of manifold architectures of freedom by contributing to this repository.


## Status
First Drafts & Idea Collection

## Frontend
When it comes to state of the art web programming frameworks [Svelte](https://svelte.dev) is the framework [of choice](https://www.youtube.com/watch?v=rv3Yq-B8qp4) imo.    
The two main reasons for that choice - comparing svelte to angular, vue and react - are performance and simplicity.   
You might continuously improve the performance of this page utilizing [pagespeed.web.dev](https://pagespeed.web.dev/).   
To speed up programming while ensuring beauty we utilize the [UI Kit Attractions](https://illright.github.io/attractions/?ref=madewithsvelte.com) - see also [intro](https://www.youtube.com/watch?v=RkD88ARvucM&t=492s).

If you use VS Code as IDE you might want to install the extension named "svelte for vs code".  

## Backend
When it comes to off-chain backends [Deno](https://deno.land) is the runtime environment of choice imo.    
Deno can be perceived as the successor of NodeJS imo.  
You might check the [Deno Main Repo](https://github.com/denoland/deno) and join the [Deno Community](https://discord.com/invite/deno).

### Start Locally
To start the backend server locally you might execute:  

```sh
./start-learn-2-earn-server.sh locally
```

### Start in Production
```sh
./start-learn-2-earn-server.sh productionmode
```


## Contribute
Please contribute via pull request. 


## Act of Revolt Proposal


### Name


### Handle
https://twitter.com/Peer2peerE

### Description
Let us be together in playful creativity to free the world.  
Everyone is invited to support the emergence of manifold architectures of freedom by contributing to the code which can be found here: https://github.com/cultfamily-on-github/cult-education-games-microservice ...
I added the cycle keyword in some commitmessages - see evidencelink.

### Evidence Link


### Worth

### Wallet
0x9E972a43B3B8D68cD70930697E16429E47E88151

### Transaction of this Proposal


### Act of Revolt ID




## Learnings & Remarks Along This Journey

#### Auto Scroll To Perfect Position
```ts
    const element = document.getElementById("addEducationAsset");
    const rect = element.getBoundingClientRect();
    const bottomYPositionOfElement = Math.round(rect.bottom)
    window.scrollTo(0, bottomYPositionOfElement);
```
#### Full Screen Mode
In this project I learned a lot about full screen enablement ... before I found a very simple solution which is adding the "" attribute to the iframe tag. ... fun :) 

so the following could be deleted in the code ...
```ts
 if (document.addEventListener) {
    document.addEventListener("fullscreenchange", exitHandler, false);
    document.addEventListener("mozfullscreenchange", exitHandler, false);
    document.addEventListener("MSFullscreenChange", exitHandler, false);
    document.addEventListener("webkitfullscreenchange", exitHandler, false);
  }
  function exitHandler() {
    // @ts-ignore
    if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
      iFrameHeight = "315";
    }
  }

  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      // @ts-ignore
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      // @ts-ignore
      document.webkitExitFullscreen();
      // @ts-ignore
    } else if (document.msExitFullscreen) {
      /* IE11 */
      // @ts-ignore
      document.msExitFullscreen();
    }
  }
  /* Function to open fullscreen mode */
  function openFullscreen() {
    iFrameHeight = "100%";

    var elem = document.getElementById("assetDiv");
    /* If fullscreen mode is available, show the element in fullscreen */
    if (
      document.fullscreenEnabled /* Standard syntax */ ||
      // @ts-ignore
      document.webkitFullscreenEnabled /* Safari */ ||
      // @ts-ignore
      document.msFullscreenEnabled /* IE11 */
    ) {
      /* Show the element in fullscreen */
      if (elem.requestFullscreen) {
        elem.requestFullscreen(); /* Standard syntax */
        // @ts-ignore
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        // @ts-ignore
        elem.webkitRequestFullscreen();
        // @ts-ignore
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        // @ts-ignore
        elem.msRequestFullscreen();
      }
    }
  }
```
