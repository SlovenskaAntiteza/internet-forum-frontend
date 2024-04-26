import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitcallbackComponent } from './gitcallback.component';

describe('GitcallbackComponent', () => {
  let component: GitcallbackComponent;
  let fixture: ComponentFixture<GitcallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GitcallbackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GitcallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
