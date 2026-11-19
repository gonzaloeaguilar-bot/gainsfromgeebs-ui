/** Pure layout primitives; caller supplies measured sizes. No DOM or framework dependency. */
export function fitEditorialCard({viewportHeight,headerHeight,dockHeight,captionHeight,railWidth,ratio=9/16,scale=1.035,gap=12,peek=20,clearance=24}) {
  const values=[viewportHeight,headerHeight,dockHeight,captionHeight,railWidth,ratio,scale,gap,peek,clearance];
  if(values.some(v=>!Number.isFinite(v)||v<0)||ratio===0||scale<1)throw new TypeError('Invalid measured layout');
  const available=viewportHeight-headerHeight-dockHeight-clearance;
  const maxImageHeight=available/scale-captionHeight;
  const width=Math.min(railWidth-2*(peek+gap),maxImageHeight*ratio);
  if(width<=0) return {fits:false,reason:'No usable media area; simplify caption or layout'};
  const imageHeight=width/ratio,cardHeight=imageHeight+captionHeight;
  return {fits:true,width,imageHeight,cardHeight,scaledHeight:cardHeight*scale,gutter:(railWidth-width)/2,available};
}
export function auditEditorialGeometry({image,action,card,rail,headerBottom,dockTop,centerTolerance=2}) {
  const rects=[image,action,card,rail];
  if(rects.some(r=>!r||['left','right','top','bottom'].some(k=>!Number.isFinite(r[k]))||r.right<=r.left||r.bottom<=r.top)||![headerBottom,dockTop,centerTolerance].every(Number.isFinite))throw new TypeError('Measured rectangles required');
  const intersects=image.left<action.right&&image.right>action.left&&image.top<action.bottom&&image.bottom>action.top;
  return {actionOutsideImage:!intersects,actionAfterImage:action.top>=image.bottom,fullyVisible:card.top>=headerBottom&&card.bottom<=dockTop,centered:Math.abs((card.left+card.right-rail.left-rail.right)/2)<=centerTolerance};
}
