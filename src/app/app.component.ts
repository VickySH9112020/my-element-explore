import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  
  title = 'my-element-explore';
  @ViewChild('domId') dom: any;           // 确认该对象前，不指定类型
  @ViewChild('containerId', { read: ViewContainerRef })
  viewContainer!: any;                    // 默认是elementRef对象，因此必须指定read
  @ViewChild('templateId') template: any; // 确认该对象前，不指定类型
  constructor(private renderer2: Renderer2, private vcComponentRef: ViewContainerRef, private eleComponentRef: ElementRef){}
  ngOnInit(): void {
    console.log(this.vcComponentRef);
    console.log(this.eleComponentRef);
    console.log(this.vcComponentRef.element === this.eleComponentRef); // false -- 看来ViewContainerRef.element和elementRef并不能完全划等号
    console.log(this.vcComponentRef.element.nativeElement === this.eleComponentRef.nativeElement); // true -- 但是他们内部存储的原生DOM确实是同一个
  }

  ngAfterViewInit(): void {
    // 1. what's different from ElementRef, ViewContainerRef and TemplateRef 
    console.log('dom', this.dom);
    console.log('viewContainer', this.viewContainer);
    console.log('template', this.template);
    // 2. how to change nativeDome (CRUD) 
    this.renderer2.setStyle(this.dom.nativeElement, 'color', 'red');
    // 3. how to inject template into viewContainer
    this.viewContainer.createEmbeddedView(this.template);
    this.vcComponentRef.createEmbeddedView(this.template);
  }
}